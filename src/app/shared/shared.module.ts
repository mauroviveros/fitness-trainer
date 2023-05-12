import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { NativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";

import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";

import { LayoutComponent } from "./components/layout/layout.component";
import { ProfileImgComponent } from "./components/profile-img/profile-img.component";

import { FormErrorPipe } from "./pipes/form-error.pipe";
import { CustomerPipe } from "./pipes/customer.pipe";
import { HighlightPipe } from "./pipes/highlight.pipe";
import { ExercisePipe } from "./pipes/exercise.pipe";

const ANGULAR_MATERIAL = [
  MatAutocompleteModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    LayoutComponent,
    ProfileImgComponent,
    CustomerPipe,
    FormErrorPipe,
    HighlightPipe,
    ExercisePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NativeDateModule,
    ANGULAR_MATERIAL
  ],
  exports: [
    ANGULAR_MATERIAL,
    LayoutComponent,
    ProfileImgComponent,
    CustomerPipe,
    FormErrorPipe,
    HighlightPipe,
    ExercisePipe
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500 }
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: "es-AR"
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: "LL",
        },
        display: {
          dateInput: "DD/MM/YYYY",
          monthYearLabel: "MMM YYYY",
          dateA11yLabel: "LL",
          monthYearA11yLabel: "MMMM YYYY",
        },
      },
    }
  ]
})
export class SharedModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIcon("youtube", domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/youtube.svg"));
    matIconRegistry.addSvgIcon("instagram", domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/instagram.svg"));
  }
}
