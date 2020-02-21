import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPublicationPage } from './new-publication.page';

const routes: Routes = [
  {
    path: '',
    component: NewPublicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPublicationPageRoutingModule {}
