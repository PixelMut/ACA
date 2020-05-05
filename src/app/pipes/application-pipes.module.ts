
import { DateAgoPipe } from './date-ago.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    DateAgoPipe
  ],
  exports: [
    DateAgoPipe
  ]
})
export class ApplicationPipesModule {}
