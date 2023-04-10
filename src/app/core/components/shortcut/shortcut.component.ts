import { Component, Input } from "@angular/core";

@Component({
  selector: "core-shortcut",
  templateUrl: "./shortcut.component.html",
  styleUrls: ["./shortcut.component.scss"]
})
export class ShortcutComponent {
  @Input() public text = "dashboard";
  @Input() public icon?: string;
  @Input() public link?: string;
  @Input() public disabled?: boolean;
}
