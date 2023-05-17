import { Component, Input } from "@angular/core";

@Component({
  selector: "core-shortcut",
  templateUrl: "./shortcut.component.html",
  styleUrls: ["./shortcut.component.scss"]
})
export class ShortcutComponent {
  @Input() public label = "dashboard";
  @Input() public icon = "dashboard";
  @Input() public link = "";
  @Input() public disabled = false;
}
