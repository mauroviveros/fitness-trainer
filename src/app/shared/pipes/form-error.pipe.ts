import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
