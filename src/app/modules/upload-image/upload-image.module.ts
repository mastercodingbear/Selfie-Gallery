import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageComponent } from './upload-image.component';
import { RouterModule } from '@angular/router';
import { uploadRoutes } from './upload-image.routing';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UploadImageComponent
  ],
  imports: [
    RouterModule.forChild(uploadRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    NgxDropzoneModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class UploadImageModule { }
