import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPublicationPageRoutingModule } from './detail-publication-routing.module';

import { DetailPublicationPage } from './detail-publication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPublicationPageRoutingModule
  ],
  declarations: [DetailPublicationPage]
})
export class DetailPublicationPageModule {}
