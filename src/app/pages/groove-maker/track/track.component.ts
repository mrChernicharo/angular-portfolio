import { newArray } from "@angular/compiler/src/util";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { BehaviorSubject, from, generate, Observable, of } from "rxjs";
import {
  delay,
  filter,
  map,
  mapTo,
  switchAll,
  switchMap,
  tap,
} from "rxjs/operators";
import { GrooveService, Note, TimeFormule, Track } from "../groove.service";

@Component({
  selector: "app-track",
  templateUrl: "./track.component.html",
  styleUrls: ["./track.component.scss"],
})
export class TrackComponent implements OnInit, AfterViewInit {
  instruments = ["hi-hat", "snare", "bass-kick"];
  @ViewChild("row", { static: false }) notesContainerRef;
  @Input() index: number;
  currBarLength: number;
  LocalNotes: Note[] = [];
  currentTicks: number;
  localTrack: Track;
  barFormule$: Observable<TimeFormule>;
  notes$ = new BehaviorSubject<Note[]>([]);
  ticks$: Observable<Note[]>;
  pulses$: Observable<Note[]>;

  get noteContainerEl() {
    return this.notesContainerRef.nativeElement as Element;
  }

  constructor(private groove: GrooveService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.barFormule$ = this.groove.timeFormule$.pipe(
      tap((timeForm) => {
        this.pulses$ = of(new Array<Note>(timeForm.pulses));
        this.ticks$ = of(new Array<Note>(timeForm.ticks));
        this.currentTicks = timeForm.ticks;
      }),
      delay(10),
      tap((timeForm) => {
        this.currBarLength = timeForm.pulses * timeForm.ticks;
        this.setLocalNotes(this.currBarLength);
        // this.groove.setTracks(timeForm.pulses * timeForm.ticks);
      })
    );
  }

  ngAfterViewInit() {
    this.renderer.setProperty(this.noteContainerEl, "id", `row-${this.index}`);
    console.log(this.noteContainerEl);
  }

  public updateNote(tick, pulse, event: Event) {
    console.log("index: " + this.index);
    console.log("tick: " + tick);
    console.log("pulse: " + pulse);
    console.log(event);

    const noteIndex = pulse * this.currentTicks + tick;

    console.log("note index:" + noteIndex);
    console.log(this.LocalNotes);

    // this.groove.updateTrackNotes(this.index, )
    const noteEl = event.target as Element;
    console.log(noteEl);

    if (noteEl.classList.contains("selected")) {
      this.renderer.removeClass(noteEl, "selected");
      this.LocalNotes[noteIndex].shouldPlay = false;
    } else {
      this.renderer.addClass(noteEl, "selected");
      this.LocalNotes[noteIndex].shouldPlay = true;
    }
  }

  setInstrument(index: number) {
    console.log(this.instruments[index]);

    this.groove.setTrackInstrument(this.index, this.instruments[index]);
  }

  setLocalNotes(barLength: number) {
    console.log(barLength);

    this.LocalNotes = [];
    for (let i = 0; i < barLength; i++) {
      this.LocalNotes.push({ shouldPlay: false });
      this.notes$.next(this.LocalNotes);
    }

    console.log(this.noteContainerEl);

    // this.renderer.removeClass(this.noteContainerEl, "selected");

    console.log(this.LocalNotes);
    this.groove.updateTrackNotes(this.index, this.LocalNotes);
  }
}
// if (this.LocalNotes.length === 0) {
// console.log(this.index + "localNotes vazio");
// if (this.LocalNotes.length === this.currBarLength) {
//   console.log("localNotes com o mesmo tamanho");
// } else if (this.LocalNotes.length > this.currBarLength) {
//   console.log("localNotes maior");
//   this.groove.shrinkTracksLength(barLength);
// } else if (this.LocalNotes.length < this.currBarLength) {
//   console.log("localNotes menor");
//   this.groove.growTracksLength(barLength);
// } else if (this.LocalNotes.length === 0) {
//   console.log(this.index + "localNotes vazio");

//   for (let i = 0; i < barLength; i++) {
//     this.LocalNotes.push({ shouldPlay: false });
//   }
// this.notes$.next(this.LocalNotes);
