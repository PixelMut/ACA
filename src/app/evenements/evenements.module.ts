import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvenementsPageRoutingModule } from './evenements-routing.module';

import { EvenementsPage } from './evenements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EvenementsPageRoutingModule
  ],
  declarations: [EvenementsPage]
})
export class EvenementsPageModule {}
