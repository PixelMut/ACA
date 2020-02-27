import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailEvenementPage } from './detail-evenement.page';

const routes: Routes = [
  {
    path: '',
    component: DetailEvenementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailEvenementPageRoutingModule {}
