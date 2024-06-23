import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evenOdd',
})
export class EvenOddPipe implements PipeTransform {
  transform(id: number): string {
    return id % 2 === 0 ? 'even' : 'odd';
  }
}
