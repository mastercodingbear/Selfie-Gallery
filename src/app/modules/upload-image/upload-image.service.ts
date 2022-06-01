import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImageUpload, UploadType } from './upload-image.model';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  uploadImageToStorage(imageUpload: ImageUpload): Observable<number | undefined> {
    // Upload image to firebase storage
    const filePath = `/${imageUpload.type}/${imageUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, imageUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL: string) => {
          // Save img url to firebase real-time database
          imageUpload.url = downloadURL;
          imageUpload.name = imageUpload.file.name;
          this.saveFileData(imageUpload);
        });
      })
    ).subscribe();

    // Return upload percentage
    return uploadTask.percentageChanges();
  }

  private saveFileData(imageUpload: ImageUpload): void {
    // Save a new document to collection
    const listRef: AngularFireList<ImageUpload> = this.db.list(imageUpload.type);
    listRef.push(imageUpload);
  }

  getImages(imageType: UploadType): AngularFireList<ImageUpload> {
    // Get image list
    return this.db.list(`/${imageType}`);
  }
}
