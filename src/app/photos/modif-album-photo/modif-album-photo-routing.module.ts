import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifAlbumPhotoPage } from './modif-album-photo.page';

const routes: Routes = [
  {
    path: '',
    component: ModifAlbumPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifAlbumPhotoPageRoutingModule {}
