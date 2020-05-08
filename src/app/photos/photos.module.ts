import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotosPageRoutingModule } from './photos-routing.module';

import { PhotosPage } from './photos.page';
import { FileSizeFormatPipe } from '../pipes/file-size-format.pipe';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HideOnscrollModule } from '../hide-on-scroll.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotosPageRoutingModule,
    HideOnscrollModule
  ],
  declarations: [PhotosPage,FileSizeFormatPipe],
  providers: [
    PhotoViewer
  ]
    
})
export class PhotosPageModule {}
