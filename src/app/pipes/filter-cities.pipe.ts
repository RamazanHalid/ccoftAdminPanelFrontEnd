import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCities'
})
export class FilterCitiesPipe implements PipeTransform {

  transform(value: any, id: unknown): unknown {

    return id ? value.filter(c=>c.COUNTRY.COUNTRY_ID == id) : value;
  }

}
