import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPublicationPage } from './detail-publication.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPublicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPublicationPageRoutingModule {}
