import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foo'
})
export class FooPipe implements PipeTransform {

  transform(value: string, footext?: string): string {
    return footext + '_' + value + '_' + footext;
  }


}
