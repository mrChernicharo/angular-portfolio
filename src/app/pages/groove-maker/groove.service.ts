import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  concat,
  interval,
  merge,
  Observable,
  of,
  Subject,
} from "rxjs";
import {
  filter,
  finalize,
  map,
  mapTo,
  mergeMap,
  skipWhile,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";

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
  // currentLength: number;
  // tempo$ = new BehaviorSubject<number>(100);
  tempo$ = new Observable<number>();
  timeFormule$ = new BehaviorSubject<TimeFormule>({ pulses: 2, ticks: 4 });
  currTimeFormule: TimeFormule;
  currBarLength;
  // isPlaying = new BehaviorSubject<boolean>(false);
  isPlaying = false;
  // barLength$: Observable<number>;
  // latestTempo: number;
  killInterval$ = new Subject<boolean>();

  constructor() {
    this.tracks$
      .pipe(
        tap((tracks) => {
          console.dir(tracks);
        })
      )
      .subscribe();
    this.timeFormule$.subscribe((timeFormule) => {
      this.currTimeFormule = timeFormule;
      this.currBarLength =
        this.currTimeFormule.pulses * this.currTimeFormule.ticks;
    });
    this.tempo$ = of(100);
  }

  addTrack() {
    const newEmptyTrack: Track = {
      instrument: "hi-hat",
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

  setTrackInstrument(i: number, instrument: string) {
    this._trackStore[i].instrument = instrument;
  }

  updateTrackNotes(i: number, notes: Note[]) {
    this._trackStore[i].notes = notes;
    console.log(this._trackStore);
  }

  updateTempo(tempo) {
    console.log(tempo);
    // this.pauseGroove();
    this.tempo$ = of(tempo);

    if (this.isPlaying) {
      this.pauseGroove();
      this.playGroove();
    }
  }

  playGroove() {
    console.log("play!");
    console.dir(this._trackStore);
    this.isPlaying = true;

    this.tempo$
      .pipe(
        tap((tempo) => {
          console.log("interval Time!");

          // this.latestTempo = tempo;
        }),
        switchMap((tempo) => interval((60 / 4 / tempo) * 1000)),
        takeUntil(this.killInterval$),
        tap((b) => {
          // transforma seq 0, 1, 2...infinito em 0, 1, 2, 0, 1, 2, 0.. de acordo com compasso
          let beat = b % this.currBarLength;

          // colorir tempo atual em tods as tracks
          this.drawClickPosition(beat);
        }),
        // filter((v) => v % this.currBarLength === 0),
        map((v) => {
          let tickPayload: string[] = [];
          this._trackStore.forEach((track, i) => {
            // console.log(track.notes[v % this.currBarLength]);
            // console.log(track.instrument);
            // console.log(track.index);

            if (track.notes[v % this.currBarLength].shouldPlay) {
              tickPayload.push(track.instrument);
            }
          });
          return tickPayload;
        }),
        tap((v) => {
          // console.log(v);
        })

        // console.log(this._trackStore.forEach);
        // this._trackStore.forEach((track, i, array) => {

        // })

        // const beat = this._trackStore.map((track, i) => {
        //   if (track.notes.filter((track) => track.shouldPlay)) {
        //     return track.instrument;
        //   }
        // });

        // console.log(beat);
      )
      .subscribe((tempo) => {});
  }

  pauseGroove() {
    this.isPlaying = false;

    this.killInterval$.next(true);
    console.log("pause!");
  }

  drawClickPosition(beat) {
    console.log(beat);
    let instrsAmount = this._trackStore.length;
    let ticks = this.currTimeFormule["ticks"];
    let pulses = this.currTimeFormule["pulses"];
    let currNotesEls = document.querySelectorAll(".note");
    let verticalEls = document.querySelectorAll(`.tick-${beat}`);
    let previouslEls = document.querySelectorAll(
      `.tick-${beat !== 0 ? beat - 1 : beat === 0 ? ticks * pulses - 1 : beat}`
    );

    previouslEls.forEach((el, key, parent) => {
      el?.classList?.remove("current");
    });

    verticalEls.forEach((el, key, parent) => {
      el.classList.add("current");
    });
    // console.log(verticalEls);

    // console.log("instrsAmount: " + instrsAmount);
    // console.log(currNotesEls);
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
//
//
//
// growTracksLength(barLength: number) {
//   console.log(barLength);
//   console.log(this._trackStore[0].notes.length);

//   const diff = this._trackStore[0].notes.length - barLength;
//   console.log(diff);

//   this._trackStore.forEach((track, i) => {});
// }
// shrinkTracksLength(barLength: number) {
//   console.log(barLength);
//   console.log(this._trackStore[0].notes.length);

//   const diff = barLength - this._trackStore[0].notes.length;
//   console.log(diff);
//   this._trackStore.forEach((track, i) => {});
// }
