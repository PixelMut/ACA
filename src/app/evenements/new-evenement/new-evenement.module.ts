import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewEvenementPageRoutingModule } from './new-evenement-routing.module';
import { NewEvenementPage } from './new-evenement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewEvenementPageRoutingModule
  ],
  declarations: [NewEvenementPage]
})
export class NewEvenementPageModule {}
