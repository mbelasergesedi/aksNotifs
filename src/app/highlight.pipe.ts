import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(results: any, searchText: string): any[] {

    if (!results) { return []; }
    if (!searchText) { return results; }

    const value = results.replace(
      searchText, `<span style='background-color:yellow'>${searchText}</span>`);
    // console.log('value', value);
    return value;
  }
}

