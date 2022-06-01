import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

  // Redirect empty path to '/generate'
  { path: '', pathMatch: 'full', redirectTo: 'generate' },

  // Routes
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Upload page
      {
        path: 'upload',
        loadChildren: (): any => import('app/modules/upload-image/upload-image.module').then(m => m.UploadImageModule)
      },
      // Generate photo page
      {
        path: '',
        loadChildren: (): any => import('app/modules/generate-photo/generate-photo.module').then(m => m.GeneratePhotoModule)
      }
    ]
  }
];
