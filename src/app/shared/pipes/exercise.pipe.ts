import { Pipe, PipeTransform } from "@angular/core";
import { Exercise } from "../interfaces/exercises";

@Pipe({
  name: "exercise"
})
export class ExercisePipe implements PipeTransform {

  transform(exercise: Exercise): string {
    return `${exercise.name}`;
  }

}
