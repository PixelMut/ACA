import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikesListModalPage } from './likes-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: LikesListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikesListModalPageRoutingModule {}
