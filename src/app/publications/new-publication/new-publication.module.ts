import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPublicationPageRoutingModule } from './new-publication-routing.module';

import { NewPublicationPage } from './new-publication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewPublicationPageRoutingModule
  ],
  declarations: [NewPublicationPage]
})
export class NewPublicationPageModule {}
