import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComListModalPage } from './com-list-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ComListModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComListModalPageRoutingModule {}
