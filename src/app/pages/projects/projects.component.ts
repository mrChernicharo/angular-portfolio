import { Component, OnInit } from "@angular/core";
import { Project, ProjectsService } from "./projects.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
  projetos: Project[] = [];
  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projetos = this.projectsService.projects;
  }
}
