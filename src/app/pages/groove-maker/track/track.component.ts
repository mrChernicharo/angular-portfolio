import { newArray } from "@angular/compiler/src/util";
import { Component, Input, OnInit, Renderer2 } from "@angular/core";
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
export class TrackComponent implements OnInit {
  instruments = ["hi-hat", "snare", "bass-kick"];
  @Input() index: number;

  LocalNotes: Note[] = [];
  localTrack: Track;
  barFormule$: Observable<TimeFormule>;
  // notes$: Observable<Note[]>;
  notes$ = new BehaviorSubject<Note[]>([]);
  ticks$: Observable<Note[]>;
  pulses$: Observable<Note[]>;

  constructor(private groove: GrooveService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.barFormule$ = this.groove.timeFormule$.pipe(
      tap((timeForm) => {
        this.pulses$ = of(new Array<Note>(timeForm.pulses));
        this.ticks$ = of(new Array<Note>(timeForm.ticks));
      }),
      delay(10),
      tap((timeForm) => {
        this.LocalNotes = new Array<Note>(timeForm.pulses * timeForm.ticks);
        this.notes$.next(this.LocalNotes);
        this.groove.setTracks(timeForm.pulses * timeForm.ticks);
      })
    );
  }

  public updateNote(tick, pulse, event: Event) {
    console.log(this.index);
    console.log(tick);
    console.log(pulse);
    console.log(event);

    console.log(this.LocalNotes);

    // this.groove.updateTrackNotes(this.index, )

    const noteEl = event.target as Element;

    noteEl.classList.contains("selected")
      ? this.renderer.removeClass(event.target, "selected")
      : this.renderer.addClass(event.target, "selected");
  }

  setInstrument(index: number) {
    console.log(this.instruments[index]);

    this.groove.setTrackInstrument(this.index, this.instruments[index]);
  }
}
