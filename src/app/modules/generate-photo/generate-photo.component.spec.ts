import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePhotoComponent } from './generate-photo.component';

describe('GeneratePhotoComponent', () => {
  let component: GeneratePhotoComponent;
  let fixture: ComponentFixture<GeneratePhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
