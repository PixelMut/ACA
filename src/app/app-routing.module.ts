import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'detail-publication',
    loadChildren: () => import('./publications/detail-publication/detail-publication.module').then( m => m.DetailPublicationPageModule)
  },
  {
    path: 'new-publication',
    loadChildren: () => import('./publications/new-publication/new-publication.module').then( m => m.NewPublicationPageModule)
  },
  {
    path: 'modif-publication',
    loadChildren: () => import('./publications/modif-publication/modif-publication.module').then( m => m.ModifPublicationPageModule)
  },
  {
    path: 'evenements',
    loadChildren: () => import('./evenements/evenements.module').then( m => m.EvenementsPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
