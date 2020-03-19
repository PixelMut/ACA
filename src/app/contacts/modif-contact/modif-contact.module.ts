import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifContactPageRoutingModule } from './modif-contact-routing.module';

import { ModifContactPage } from './modif-contact.page';
import {PublicationsPageModule} from '../../publications/publications.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ModifContactPageRoutingModule,
        ReactiveFormsModule,
        PublicationsPageModule
    ],
  declarations: [ModifContactPage]
})
export class ModifContactPageModule {}
