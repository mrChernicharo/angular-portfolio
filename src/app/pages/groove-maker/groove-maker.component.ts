import { Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject, Observable, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  ignoreElements,
  map,
  skip,
  takeLast,
  tap,
  throttle,
} from "rxjs/operators";
import { appSounds } from "./app.sounds";
import { GrooveService, TimeFormule, Track } from "./groove.service";

@Component({
  selector: "app-groove-maker",
  templateUrl: "./groove-maker.component.html",
  styleUrls: ["./groove-maker.component.scss"],
})
export class GrooveMakerComponent implements OnInit, OnDestroy {
  tempo = 100;
  trackCount = 0;
  tracks$: Observable<Track[]>;
  isPlaying = false;
  isClickOn = true;
  currentLength: number;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private r: Renderer2,
    private groove: GrooveService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tempo: [100, [Validators.max(500), Validators.min(20)]],
      pulses: [2],
      ticks: [4],
      isClickOn: [this.isClickOn],
    });

    this.tracks$ = this.groove.tracks$.pipe(
      tap((tracks) => {
        this.trackCount = tracks.length;
      })
    );

    this.form.get("ticks").valueChanges.subscribe((value) => {
      console.log(value);
      this.cleanActiveNotes();
    });

    this.form.get("pulses").valueChanges.subscribe((value) => {
      console.log(value);
      this.cleanActiveNotes();
    });

    this.form
      .get("tempo")
      .valueChanges.pipe(
        debounceTime(400),
        filter((value) => value > 30 && value < 300)
      )
      .subscribe((value) => {
        console.log(value);
        this.groove.updateTempo(value);
      });

    this.grooveSettingsChanged().subscribe((formValue) => {
      this.groove.timeFormule$.next(formValue);
    });

    this.addInstrumentTrack();
  }

  ngOnDestroy() {
    this.groove.removeTrack();
  }

  public grooveSettingsChanged(): Observable<any> {
    return this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }

  public addInstrumentTrack() {
    if (this.trackCount < 6) {
      this.groove.addTrack();
    } else {
      console.log("maximun tracks limit reached!");
    }
  }

  public removeInstrumentTrack() {
    if (this.trackCount > 1) {
      this.groove.removeTrack();
    } else {
      console.log("minimun tracks limit reached!");
    }
  }

  cleanActiveNotes() {
    document.querySelectorAll(".selected").forEach((el, i, arr) => {
      arr[i].classList.remove("selected");
    });
  }

  clearUIClickPos() {
    this.groove.clearUI();
  }

  public toggleLoop() {
    this.isPlaying = !this.isPlaying;

    this.isPlaying ? this.groove.playGroove() : this.groove.pauseGroove();
  }
}
