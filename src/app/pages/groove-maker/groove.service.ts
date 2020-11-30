import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

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
  // private _trackStore: Track[] = [{ instrument: "", notes: [], index: 0 }];
  private _trackStore: Track[] = [];
  tracks$ = new BehaviorSubject<Track[]>([]);
  currentLength: number;
  tempo$ = new BehaviorSubject<number>(100);
  timeFormule$ = new BehaviorSubject<TimeFormule>({ pulses: 2, ticks: 4 });
  isPlaying = new BehaviorSubject<boolean>(false);
  barLength$: Observable<number>;

  constructor() {
    this.tracks$
      .pipe(
        tap((tracks) => {
          console.dir(tracks);
          this.currentLength = tracks.length;
        })
      )
      .subscribe();
  }

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

  setTracks(barLength: number) {
    this._trackStore.forEach((track, i) => {
      this._trackStore[i].instrument = track.instrument;
      this._trackStore[i].notes = new Array(barLength).map((items) => {
        let obj = Object.assign({}, { shouldPlay: false });
        return obj;
      });
    });
  }

  setTrackInstrument(i: number, instrument: string) {
    this._trackStore[i].instrument = instrument;
  }

  updateTrackNotes(i: number, notes: Note[]) {}

  // setTrackNotes(trackIndex: number, notes?: Note[]) {
  //   notes
  //     ? (this._trackStore[trackIndex].notes = [...notes])
  //     : (this._trackStore[trackIndex].notes = new Array(this.currentLength));
  // }

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
