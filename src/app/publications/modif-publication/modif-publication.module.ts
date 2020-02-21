import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifPublicationPageRoutingModule } from './modif-publication-routing.module';

import { ModifPublicationPage } from './modif-publication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifPublicationPageRoutingModule
  ],
  declarations: [ModifPublicationPage]
})
export class ModifPublicationPageModule {}
