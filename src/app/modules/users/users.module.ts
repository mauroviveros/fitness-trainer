import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { UsersRoutingModule } from "./users.routing";
import { SharedModule } from "../../shared/shared.module";

import { ListComponent } from "./pages/list/list.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { NewUserComponent } from "./components/new-user/new-user.component";
import { BottomSheetComponent } from "./components/bottom-sheet/bottom-sheet.component";


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    NewUserComponent,
    BottomSheetComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
