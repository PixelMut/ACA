import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'folderfilter',
    pure: false
})
export class PhotoFilterPipe implements PipeTransform {
    transform(items: any[], filter: String): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.id_parent.indexOf(filter) !== -1);
    }
}