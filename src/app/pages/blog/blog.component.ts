import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BlogComponent implements OnInit {
  dark = false;
  constructor() {}

  ngOnInit(): void {}

  handleToggle() {
    let root = document.documentElement;
    // console.log('toggle!')
    this.dark = !this.dark;

    if (this.dark) {
      root.style.setProperty("--background", "#474747");
      root.style.setProperty("--text", "#f2f3f5");
      root.style.setProperty("--title", "#f2f3f5");
      root.style.setProperty("--link", "#2aa9e0");
      root.style.setProperty("--highlight", "#2bd66d");
    } else {
      root.style.setProperty("--link", "#5965e0");
      root.style.setProperty("--background", "#f2f3f5");
      root.style.setProperty("--text", "#474747");
      root.style.setProperty("--title", "#474747");
      // root.style.setProperty('--highlight', "#9a44fd");
      root.style.setProperty("--highlight", "#6942f7");
      // #f88d46

      // root.style.setProperty('--shadow', "rgba(0, 0, 0, 0.6)");
    }
  }
}
