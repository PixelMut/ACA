import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvenementsPage } from './evenements.page';

const routes: Routes = [
  {
    path: '',
    component: EvenementsPage
  },
  {
    path: 'new-evenement',
    loadChildren: () => import('./new-evenement/new-evenement.module').then( m => m.NewEvenementPageModule)
  },
  {
    path: 'detail-evenement',
    loadChildren: () => import('./detail-evenement/detail-evenement.module').then( m => m.DetailEvenementPageModule)
  },
  {
    path: 'modif-evenement',
    loadChildren: () => import('./modif-evenement/modif-evenement.module').then( m => m.ModifEvenementPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvenementsPageRoutingModule {}
