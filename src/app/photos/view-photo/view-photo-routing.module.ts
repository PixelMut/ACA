import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPhotoPage } from './view-photo.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPhotoPageRoutingModule {}
