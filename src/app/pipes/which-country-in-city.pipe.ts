import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whichCountryInCity'
})
export class WhichCountryInCityPipe implements PipeTransform {

  transform(value: any, countries:any): any {
    return countries.find(c=>c.COUNTRY_ID == value).COUNTRY_TR;
  }

}
