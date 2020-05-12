import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotosPageRoutingModule } from './photos-routing.module';

import { PhotosPage } from './photos.page';
import { FileSizeFormatPipe } from '../pipes/file-size-format.pipe';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HideOnscrollModule } from '../hide-on-scroll.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotosPageRoutingModule,
    HideOnscrollModule,
    PipesModule
  ],
  declarations: [PhotosPage],
  providers: [
    PhotoViewer
  ]
    
})
export class PhotosPageModule {}
