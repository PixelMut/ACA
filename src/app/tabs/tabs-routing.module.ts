import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'publications',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../publications/publications.module').then(m => m.PublicationsPageModule)
          },
          {
            path: 'new',
            loadChildren: () =>
              import('../publications/new-publication/new-publication.module').then(m => m.NewPublicationPageModule)
          },
          {
            path: ':id',
            loadChildren: () =>
              import('../publications/detail-publication/detail-publication.module').then(m => m.DetailPublicationPageModule)
          },
          {
            path: 'modif/:id',
            loadChildren: () =>
              import('../publications/modif-publication/modif-publication.module').then(m => m.ModifPublicationPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'contacts',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../contacts/contacts.module').then(m => m.ContactsPageModule)
          },
          {
            path: ':id',
            loadChildren: () =>
              import('../contacts/detail-contact/detail-contact.module').then(m => m.DetailContactPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/publications',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
