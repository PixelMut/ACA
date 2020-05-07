import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PublicationsPage } from './publications.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{path: '', component: PublicationsPage}]),
    PipesModule
  ],
  declarations: [PublicationsPage],
})
export class PublicationsPageModule {}
