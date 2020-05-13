import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComListModalPageRoutingModule } from './com-list-modal-routing.module';

import { ComListModalPage } from './com-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComListModalPageRoutingModule
  ],
  declarations: [ComListModalPage]
})
export class ComListModalPageModule {}
