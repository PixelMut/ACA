import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifEvenementPage } from './modif-evenement.page';

const routes: Routes = [
  {
    path: '',
    component: ModifEvenementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifEvenementPageRoutingModule {}
