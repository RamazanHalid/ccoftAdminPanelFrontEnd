import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolConverter'
})
export class BoolConverterPipe implements PipeTransform {

  transform(value: boolean): unknown {
    if (value) {
      return "Evet"
    }
    return "Hayır";
  }

}
