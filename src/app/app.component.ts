import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "angular-portfolio";
  navOpened = false;
  @Output() navShown = new EventEmitter<boolean>();
  constructor() {}

  sidenavToggle() {
    this.navOpened = !this.navOpened;
    console.log(this.navOpened);
    this.navShown.emit(this.navOpened);
  }
}
