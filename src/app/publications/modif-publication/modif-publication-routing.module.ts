import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifPublicationPage } from './modif-publication.page';

const routes: Routes = [
  {
    path: '',
    component: ModifPublicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifPublicationPageRoutingModule {}
