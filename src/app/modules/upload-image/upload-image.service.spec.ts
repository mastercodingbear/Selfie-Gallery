import { TestBed } from '@angular/core/testing';

import { UploadImageService } from './upload-image.service';

describe('UploadImageService', () => {
  let service: UploadImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
