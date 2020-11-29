import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface TimeFormule {
  pulses: number;
  ticks: number;
}

export interface Note {
  shouldPlay: boolean;
}

export interface Track {
  instrument: string;
  notes: Note[];
  index: number;
}

@Injectable({
  providedIn: "root",
})
export class GrooveService {
  private _trackStore: Track[] = [{ instrument: "", notes: [], index: 0 }];
  tracks$ = new BehaviorSubject<Track[]>([
    { instrument: "", notes: [], index: 0 },
  ]);

  tempo$ = new BehaviorSubject<number>(100);
  timeFormule$ = new BehaviorSubject<TimeFormule>({ pulses: 4, ticks: 4 });
  isPlaying = new BehaviorSubject<boolean>(false);
  barLength$: Observable<number>;

  constructor() {}

  addTrack() {
    const newEmptyTrack: Track = {
      instrument: "",
      notes: [],
      index: this._trackStore.length,
    };
    this._trackStore.push(newEmptyTrack);

    this.tracks$.next(this._trackStore);
    console.dir(this._trackStore);
  }

  removeTrack() {
    this._trackStore.pop();

    this.tracks$.next(this._trackStore);
    console.dir(this._trackStore);
  }

  playGroove() {
    console.log("play!");
  }
  pauseGroove() {
    console.log("pause!");
  }
}

// toggleLoop() {
//   this.isPlaying = !this.isPlaying;

//   console.log("is playing ->" + this.isPlaying);
//   const notes = document.querySelectorAll(".note");

//   // pause
//   if (!this.isPlaying) {
//     notes.forEach((note, i) => {
//       notes[i].classList.contains("current")
//         ? notes[i].classList.remove("current")
//         : null;
//     });
//     clearInterval(this.click);
//     return;
//   }

//   // controle do loop
//   let i = 0;
//   this.click = setInterval(() => {
//     notes[i].classList.add("current");

//     if (i !== 0) {
//       notes[i - 1].classList.remove("current");
//     }

//     if (i === 0) {
//       notes[notes.length - 1].classList.remove("current");
//     }

//     if (i === notes.length) {
//       notes[0].classList.add("current");
//     }

//     // som do click
//     if (i % 4 === 0 && this.clickOn) {
//       let clickSound = new Audio(appSounds.click);
//       clickSound.play();
//     }

//     if (
//       notes[i].classList.contains("current") &&
//       notes[i].classList.contains("clicked")
//     ) {
//       let instrumentSonud = new Audio(appSounds.bassDrum);
//       instrumentSonud.play();
//     }

//     if (i < notes.length - 1) {
//       i++;
//     } else {
//       i = 0;
//     }
//   }, (60 / 4 / this.tempo) * 1000);
// }
