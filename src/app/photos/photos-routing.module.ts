import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosPage } from './photos.page';

const routes: Routes = [
  {
    path: '',
    component: PhotosPage
  },
  {
    path: 'modif-album-photo',
    loadChildren: () => import('./modif-album-photo/modif-album-photo.module').then( m => m.ModifAlbumPhotoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosPageRoutingModule {}
