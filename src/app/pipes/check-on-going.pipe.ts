import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkOnGoing'
})
export class CheckOnGoingPipe implements PipeTransform {

  transform(value: any, onGoing: boolean): unknown {
    return onGoing ? "-" : value;
  }

}
