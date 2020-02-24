import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsPage } from './contacts.page';

const routes: Routes = [
  {
    path: '',
    component: ContactsPage
  },
  {
    path: 'detail-contact',
    loadChildren: () => import('./detail-contact/detail-contact.module').then( m => m.DetailContactPageModule)
  },
  {
    path: 'modif-contact',
    loadChildren: () => import('./modif-contact/modif-contact.module').then( m => m.ModifContactPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsPageRoutingModule {}
