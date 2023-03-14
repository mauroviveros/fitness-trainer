import { Component, Input } from "@angular/core";

@Component({
  selector: "core-shortcut",
  templateUrl: "./shortcut.component.html",
  styleUrls: ["./shortcut.component.scss"]
})
export class ShortcutComponent {
  @Input() public icon = "dashboard";
  @Input() public link = "";
  @Input() public text = "dashboard";
}
