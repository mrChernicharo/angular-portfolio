import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  @Input() opened: boolean;
  @Input()
  position: "start" | "end";
  constructor() {}

  ngOnInit(): void {}
  mobileClose() {}
  logOut() {}
}
