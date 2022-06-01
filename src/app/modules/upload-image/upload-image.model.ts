export type UploadType = 'selfie' | 'frame' | 'background';

export interface ImageType {
  value: string;
  viewValue: string;
}

export class ImageUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;
  type: UploadType = 'selfie';

  constructor(file: File, type: UploadType) {
    this.file = file;
    this.type = type;
  }
}
