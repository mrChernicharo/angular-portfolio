import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { SkillsComponent } from "./pages/skills/skills.component";
import { AboutComponent } from "./pages/about/about.component";
import { ProjectsComponent } from "./pages/projects/projects.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";

// import {} from '@angular/material/'
// import {} from '@angular/material'

import { NavComponent } from "./components/nav/nav.component";
import { LiveExamplesComponent } from "./pages/live-examples/live-examples.component";
import { BlogComponent } from "./pages/blog/blog.component";
import { InstrumentRowComponent } from "./pages/live-examples/instrument-row/instrument-row.component";
import { GrooveMakerComponent } from "./pages/groove-maker/groove-maker.component";
import { TrackComponent } from './pages/groove-maker/track/track.component';
import { GraphsComponent } from './pages/graphs/graphs.component';
import { AppCardComponent } from './components/app-card/app-card.component';

const matModules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BlogComponent,
    HomeComponent,
    SkillsComponent,
    ProjectsComponent,
    LiveExamplesComponent,
    InstrumentRowComponent,
    GrooveMakerComponent,
    AboutComponent,
    TrackComponent,
    GraphsComponent,
    AppCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...matModules,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
