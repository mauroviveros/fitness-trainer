import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "rir"
})
export class RirPipe implements PipeTransform {

  transform(value: number): string {
    return value === -1 ? "AL FALLO" : value.toString();
  }

}
