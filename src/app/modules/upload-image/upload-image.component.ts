import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { UploadImageService } from './upload-image.service';
import { ImageType, ImageUpload } from './upload-image.model';
import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit, OnDestroy {

  imageTypes: ImageType[] = [
    { value: 'selfie', viewValue: 'Selfie' },
    { value: 'frame', viewValue: 'Frame' },
    { value: 'background', viewValue: 'Background' },
  ]
  uploadType = new FormControl(this.imageTypes[0].value);
  uploadImages: ImageUpload[] = [];
  percentages: number[] = [];
  isUploading: 'init' | 'uploading' | 'uploaded' = 'init';

  private _uploadedCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private uploadService: UploadImageService) { }

  /**
   * On Init
   */
  ngOnInit(): void {
    this.uploadedCount$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((count) => {
        if (count === 0 && this.uploadImages.length) {
          this.isUploading = 'uploaded';
        }
      })
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Getter for count of uploaded images
   */
  get uploadedCount$(): Observable<number> {
    return this._uploadedCount$.asObservable();
  }

  onSelect(event: NgxDropzoneChangeEvent): void {
    this.percentages.fill(0, event.addedFiles.length);

    this.isUploading = 'init';
    for (let i = 0; i < event.addedFiles.length; i++) {
      const newImage = new ImageUpload(event.addedFiles[i], this.uploadType.value);
      this.uploadImages.push(newImage);
    }
  }

  onRemove(index: number): void {
    this.uploadImages.splice(index, 1);
    this._uploadedCount$.next(this._uploadedCount$.value - 1);
  }

  onUploadImages(): void {
    this._uploadedCount$.next(this.uploadImages.length);
    this.isUploading = 'uploading';
    for (let i = 0; i < this.uploadImages.length; i++) {
      this.uploadService.uploadImageToStorage(this.uploadImages[i])
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((percentage) => {
          this.percentages[i] = Math.round(percentage ? percentage : 0);
          if (percentage === 100) {
            this._uploadedCount$.next(this._uploadedCount$.value - 1);
          }
        });
    }
  }

  onGeneratePhoto(): void {

  }
}
