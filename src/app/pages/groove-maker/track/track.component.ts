import { newArray } from "@angular/compiler/src/util";
import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject, from, generate, Observable, of } from "rxjs";
import { mapTo, switchAll, switchMap, tap } from "rxjs/operators";
import { GrooveService, Note, TimeFormule } from "../groove.service";

@Component({
  selector: "app-track",
  templateUrl: "./track.component.html",
  styleUrls: ["./track.component.scss"],
})
export class TrackComponent implements OnInit {
  instruments = ["hi-hat", "snare", "bass-kick"];
  @Input() index: number;
  // @Input() pulses: number;
  // @Input() ticks: number;
  // pulses$: Observable<>
  notes$: Observable<Note[]>;
  timeFormule$: Observable<TimeFormule>;
  ticks$: Observable<Note[]>;
  pulses$: Observable<Note[]>;
  constructor(private groove: GrooveService) {}

  ngOnInit(): void {
    // this.notes$.next(Array.from(this.measureLength));
    // this.notes$ = this.makeBlankNotesArray(this.pulses, this.ticks);
    this.timeFormule$ = this.groove.timeFormule$.pipe(
      tap((timeForm) => {
        console.log(timeForm);
        this.pulses$ = of(new Array<Note>(timeForm.pulses));
        this.ticks$ = of(new Array<Note>(timeForm.ticks));
      })
    );
  }

  makeBlankNotesArray(pulses, ticks) {
    const barLength = pulses * ticks;
    const blankNotesArr = new Array<Note>(barLength);
    console.log(blankNotesArr);
    return of(blankNotesArr);
  }

  // selectNote(beat, position) {
  //   console.log(beat + 1);
  //   console.log(position + 1);

  //   let clickedBeatIndex = beat * 4 + position;
  //   console.log(clickedBeatIndex);

  //   const notes = document.querySelectorAll(".note");
  //   // console.log(notes);

  //   notes[clickedBeatIndex].classList.contains("clicked")
  //     ? notes[clickedBeatIndex].classList.remove("clicked")
  //     : notes[clickedBeatIndex].classList.add("clicked");
  // }
}
