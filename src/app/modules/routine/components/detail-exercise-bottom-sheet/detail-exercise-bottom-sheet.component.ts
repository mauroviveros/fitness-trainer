import { Component, Inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";

interface Action{
  _id: string
  svg?: string
  icon?: string
  title: string
  text: string
}

@Component({
  selector: "app-detail-exercise-bottom-sheet",
  templateUrl: "./detail-exercise-bottom-sheet.component.html",
  styleUrls: ["./detail-exercise-bottom-sheet.component.scss"]
})
export class DetailExerciseBottomSheetComponent {
  actions: Action[] = [
    {
      _id: "execute",
      icon: "done",
      title: "Realizar ejercicio",
      text: "indicar peso realizado en cada serie"
    },
    {
      _id: "video",
      svg: "youtube",
      title: "Ver video",
      text: "video demostrativo del ejercicio"
    },
    {
      _id: "description",
      icon: "description",
      title: "Detalle",
      text: "Breve explicación del ejercicio"
    }

  ];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { hasRealWeight: boolean },
    private bottomSheetRef: MatBottomSheetRef<DetailExerciseBottomSheetComponent>
  ){
    if(this.data.hasRealWeight){
      this.actions.shift();
      this.actions.unshift({
        _id: "view",
        icon: "preview",
        title: "Visualizar ejercicio",
        text: "ver peso realizado"
      });
    }
  }

  onAction(action: string){
    this.bottomSheetRef.dismiss(action);
  }
}
