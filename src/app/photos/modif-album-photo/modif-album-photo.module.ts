import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifAlbumPhotoPageRoutingModule } from './modif-album-photo-routing.module';

import { ModifAlbumPhotoPage } from './modif-album-photo.page';
import { HideOnscrollModule } from 'src/app/hide-on-scroll.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifAlbumPhotoPageRoutingModule,
    HideOnscrollModule,
    PipesModule
  ],
  declarations: [ModifAlbumPhotoPage]
})
export class ModifAlbumPhotoPageModule {}
