import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModifEvenementPageRoutingModule } from './modif-evenement-routing.module';
import { ModifEvenementPage } from './modif-evenement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModifEvenementPageRoutingModule
  ],
  declarations: [ModifEvenementPage]
})
export class ModifEvenementPageModule {}
