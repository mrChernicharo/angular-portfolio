import { Component, OnInit, Renderer2 } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject, Observable, of } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { appSounds } from "../live-examples/app.sounds";
import { GrooveService } from "./groove.service";

@Component({
  selector: "app-groove-maker",
  templateUrl: "./groove-maker.component.html",
  styleUrls: ["./groove-maker.component.scss"],
})
export class GrooveMakerComponent implements OnInit {
  tempo = 100;
  timeFormule = 2;
  trackCount = 1;
  tracks$;

  // isPlaying$ = new BehaviorSubject<boolean>(false);
  isPlaying = false;
  isClickOn = true;
  click;
  timeFormule$ = new BehaviorSubject(2);
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private r: Renderer2,

    private groove: GrooveService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tempo: [100, [Validators.max(300), Validators.min(40)]],
      pulses: [4],
      ticks: [4],
      isClickOn: [this.isClickOn],
    });

    this.tracks$ = this.groove.tracks$;
    // .subscribe(tracks => {

    // })

    this.form.valueChanges.pipe(debounceTime(300)).subscribe((formValue) => {
      console.log(formValue);
      console.log("trackCount: " + this.trackCount);
      // this.timeFormule$.next(formValue["timeFormule"]);
      // this.clickOn = formValue["clickOn"];
      // this.tempo = formValue["tempo"];
    });

    this.timeFormule$.pipe(debounceTime(300)).subscribe((timeFormule) => {
      // const arr = [];
      // arr.length = timeSig;
      // this.barLength$ = of(arr);
    });
  }

  onSubmit() {}

  addInstrumentTrack() {
    if (this.trackCount < 10) {
      this.trackCount += 1;
      this.groove.addTrack();
    } else {
      console.log("maximun tracks limit reached!");
    }
  }

  removeInstrumentTrack() {
    if (this.trackCount > 1) {
      this.trackCount -= 1;
      this.groove.removeTrack();
    } else {
      console.log("minimun tracks limit reached!");
    }
  }

  toggleLoop() {
    this.isPlaying = !this.isPlaying;

    this.isPlaying ? this.groove.playGroove() : this.groove.pauseGroove();
  }
}
