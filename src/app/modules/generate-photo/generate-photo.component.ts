import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { toJpeg } from 'html-to-image';
import {
  ImageType,
  ImageUpload,
} from '@modules/upload-image/upload-image.model';
import { UploadImageService } from '@modules/upload-image/upload-image.service';

@Component({
  selector: 'app-generate-photo',
  templateUrl: './generate-photo.component.html',
  styleUrls: ['./generate-photo.component.css'],
})
export class GeneratePhotoComponent implements OnInit {

  isCustomFrame: boolean = true;
  customFrameWidth: FormControl = new FormControl(160);
  customFrameHeight: FormControl = new FormControl(160);
  customFrameColor: string = '';

  selfieImages: ImageUpload[] = [];
  frameImages: ImageUpload[] = [];
  backgroundImages: ImageUpload[] = [];

  selfieImage: string = '';
  frameImage: string = '';
  backgroundImage: string = '';

  constructor(private _uploadImageService: UploadImageService) { }

  /**
   * On Init
   */
  ngOnInit(): void {
    // Get image data from realtime database
    this._uploadImageService
      .getImages('selfie')
      .valueChanges() // returns observable
      .subscribe((list) => {
        this.selfieImages = list;
      });
    this._uploadImageService
      .getImages('frame')
      .valueChanges() // returns observable
      .subscribe((list) => {
        this.frameImages = list;
      });
    this._uploadImageService
      .getImages('background')
      .valueChanges() // returns observable
      .subscribe((list) => {
        this.backgroundImages = list;
      });
  }

  setSelfie(selfie: ImageUpload): void {
    this.selfieImage = selfie.url;
  }

  setFrame(frame: ImageUpload): void {
    this.frameImage = `url(${frame.url})`;
    this.isCustomFrame = false;
  }

  setBackground(background: ImageUpload): void {
    this.backgroundImage = `url(${background.url})`;
  }

  setCustomFrame(): void {
    this.isCustomFrame = true;
  }

  onDownloadPhoto(): void {
    const photoRef = document.getElementById('photo');
    if (!photoRef) {
      return;
    }
    // Save current dom to Jpeg
    toJpeg(photoRef, { quality: 0.95 }).then((dataUrl: string) => {
      const link = document.createElement('a');
      link.download = 'my-photo.jpeg';
      link.href = dataUrl;
      link.click();
    });
  }
}
