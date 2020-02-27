import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEvenementPage } from './new-evenement.page';

const routes: Routes = [
  {
    path: '',
    component: NewEvenementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEvenementPageRoutingModule {}
