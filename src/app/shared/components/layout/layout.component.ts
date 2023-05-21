import { Component, EventEmitter, OnInit, Output, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

interface Action{
  _id: string
  icon: string
  type?: string
}

interface Layout{
  title: string
  actions: Action[]
  back?: boolean
  close?: boolean
}

@Component({
  selector: "shared-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  @Output() action = new EventEmitter<string>;
  layout!: Layout;

  ngOnInit(){
    this.route.data.subscribe(data => {
      this.layout = data["layout"] || {};
    });
  }

  onAction(_id: string){
    this.action.emit(_id);
  }

  navigate(){
    this.router.navigate([".."], { relativeTo: this.route });
  }
}
