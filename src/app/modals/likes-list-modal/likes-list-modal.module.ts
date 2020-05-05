import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikesListModalPageRoutingModule } from './likes-list-modal-routing.module';

import { LikesListModalPage } from './likes-list-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikesListModalPageRoutingModule
  ],
  declarations: [LikesListModalPage]
})
export class LikesListModalPageModule {}
