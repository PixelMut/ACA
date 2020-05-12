import { NgModule } from '@angular/core';
import { DateAgoPipe } from './date-ago.pipe';
import { PhotoFilterPipe } from './photo-filter.pipe';
import { FileSizeFormatPipe } from './file-size-format.pipe';


@NgModule({
    declarations: [
      DateAgoPipe,
      PhotoFilterPipe,
      FileSizeFormatPipe
    ],
    imports: [

    ],
    exports: [
      DateAgoPipe,
      PhotoFilterPipe,
      FileSizeFormatPipe
    ]
})
export class PipesModule {}