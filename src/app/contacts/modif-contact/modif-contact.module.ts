import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifContactPageRoutingModule } from './modif-contact-routing.module';

import { ModifContactPage } from './modif-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifContactPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifContactPage]
})
export class ModifContactPageModule {}
