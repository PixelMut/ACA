import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifContactPageRoutingModule } from './modif-contact-routing.module';

import { ModifContactPage } from './modif-contact.page';
import {PublicationsPageModule} from '../../publications/publications.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ModifContactPageRoutingModule,
        ReactiveFormsModule,
        PublicationsPageModule,
        PipesModule
    ],
  declarations: [ModifContactPage]
})
export class ModifContactPageModule {}
