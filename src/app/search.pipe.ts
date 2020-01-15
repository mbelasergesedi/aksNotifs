import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(results: any[], searchText: string): any[] {
    if (!results) { return []; }
    if (!searchText) { return results; }

    searchText = searchText.toLowerCase();
    return results.filter( item => {
          return item.name.includes(searchText);
        });
      }
}