import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./pages/about/about.component";
import { GrooveMakerComponent } from "./pages/groove-maker/groove-maker.component";
import { BlogComponent } from "./pages/blog/blog.component";
import { HomeComponent } from "./pages/home/home.component";
import { LiveExamplesComponent } from "./pages/live-examples/live-examples.component";
import { ProjectsComponent } from "./pages/projects/projects.component";
import { SkillsComponent } from "./pages/skills/skills.component";
import { GraphsComponent } from "./pages/graphs/graphs.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "skills", component: SkillsComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "graphs", component: GraphsComponent },
  { path: "about", component: AboutComponent },
  { path: "groove", component: GrooveMakerComponent },
  { path: "live", component: LiveExamplesComponent },
  { path: "blog", component: BlogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
