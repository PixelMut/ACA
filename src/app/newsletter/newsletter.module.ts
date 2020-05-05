import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsletterPageRoutingModule } from './newsletter-routing.module';

import { NewsletterPage } from './newsletter.page';
import { ApplicationPipesModule } from '../pipes/application-pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsletterPageRoutingModule,
    ApplicationPipesModule
  ],
  declarations: [NewsletterPage]
})
export class NewsletterPageModule {}
