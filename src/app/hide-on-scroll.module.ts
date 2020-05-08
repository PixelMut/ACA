import {NgModule } from '@angular/core';
import { HideOnscrollDirective } from './hide-on-scroll.directive';
export * from "./hide-on-scroll.directive";
@NgModule({
  declarations: [
    HideOnscrollDirective
  ],
  exports:[
    HideOnscrollDirective
  ]
})
export class HideOnscrollModule {}