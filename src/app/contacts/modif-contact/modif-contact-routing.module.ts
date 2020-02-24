import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifContactPage } from './modif-contact.page';

const routes: Routes = [
  {
    path: '',
    component: ModifContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifContactPageRoutingModule {}
