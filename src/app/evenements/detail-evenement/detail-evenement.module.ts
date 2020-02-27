import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailEvenementPageRoutingModule } from './detail-evenement-routing.module';

import { DetailEvenementPage } from './detail-evenement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailEvenementPageRoutingModule
  ],
  declarations: [DetailEvenementPage]
})
export class DetailEvenementPageModule {}
