import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerModule } from 'ngx-color-picker';
import { GeneratePhotoComponent } from './generate-photo.component';
import { generateRoutes } from './generate-photo.routing';


@NgModule({
  declarations: [
    GeneratePhotoComponent
  ],
  imports: [
    RouterModule.forChild(generateRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ColorPickerModule,

    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule
  ]
})
export class GeneratePhotoModule { }
