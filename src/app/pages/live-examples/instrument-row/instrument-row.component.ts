import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface Note {
  isActive: boolean;
}

@Component({
  selector: "app-instrument-row",
  templateUrl: "./instrument-row.component.html",
  styleUrls: ["./instrument-row.component.scss"],
})
export class InstrumentRowComponent implements OnInit {
  instruments = ["hi-hat", "snare", "bass-kick"];
  @Input() measureLength;
  notes$ = new BehaviorSubject<Note[]>([]);
  constructor() {}

  ngOnInit(): void {
    this.notes$.next(Array.from(this.measureLength));
  }

  selectNote(beat, position) {
    console.log(beat + 1);
    console.log(position + 1);

    let clickedBeatIndex = beat * 4 + position;
    console.log(clickedBeatIndex);

    const notes = document.querySelectorAll(".note");
    // console.log(notes);

    notes[clickedBeatIndex].classList.contains("clicked")
      ? notes[clickedBeatIndex].classList.remove("clicked")
      : notes[clickedBeatIndex].classList.add("clicked");
  }
}
