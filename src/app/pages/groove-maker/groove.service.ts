import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  concat,
  interval,
  merge,
  Observable,
  of,
  Subject,
  throwError,
  timer,
} from "rxjs";
import {
  catchError,
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
import { appSounds } from "./app.sounds";

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
  isClickOn = new BehaviorSubject<boolean>(false);

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
    // console.log(this._trackStore);
  }

  updateTempo(tempo) {
    console.log(tempo);
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
        // 15 / tempo parece reproduzir a velocidade mais fiel ao real
        switchMap((tempo) => interval((15 / tempo) * 1000)),
        takeUntil(this.killInterval$),
        tap((b) => {
          // transforma seq 0, 1, 2...infinito em 0, 1, 2, 0, 1, 2, 0.. de acordo com compasso
          let beat = b % this.currBarLength;

          // colorir tempo atual em tods as tracks
          this.drawClickPosition(beat);
        }),
        map((v) => {
          //
          let tickPayload = [];
          this._trackStore.forEach((track, i) => {
            //
            if (track.notes && track.notes[v % this.currBarLength].shouldPlay) {
              tickPayload.push(track.instrument);
            }
          });

          // adicona som de click, caso click esteja ligado
          if (
            v % this.currTimeFormule.ticks === 0 &&
            this.isClickOn.getValue()
          ) {
            tickPayload.push("click");
          }
          //
          return tickPayload as string[];
        }),
        tap((instrums) => {
          instrums.forEach((instr) => {
            // disparar sons
            this.playInstrSound(instr);
          });
        }),
        catchError((err, err$) => {
          return throwError(err);
        })
      )
      .subscribe(
        (tempo) => {},
        (err) => {
          console.log("erro " + err);
          return of(0);
        }
      );
  }

  pauseGroove() {
    this.isPlaying = false;
    this.clearUI();

    this.killInterval$.next(true);
    console.log("pause!");
  }

  drawClickPosition(beat) {
    // console.log(beat);
    // let instrsAmount = this._trackStore.length;
    // let currNotesEls = document.querySelectorAll(".note");
    let ticks = this.currTimeFormule["ticks"];
    let pulses = this.currTimeFormule["pulses"];
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
  }

  clearUI() {
    console.log("clear this shit!");
    let currNotesEls = document.querySelectorAll(".current");
    timer(400).subscribe(
      () => {
        if (currNotesEls)
          currNotesEls.forEach((el) => el.classList.remove("current"));
      },
      (err) => {
        console.log("erro no clearUI");
      },
      () => {
        console.log("completed!");

        currNotesEls = document.querySelectorAll(".current");
        if (currNotesEls)
          currNotesEls.forEach((el) => el.classList.remove("current"));
      }
    );
  }

  playInstrSound(instr: string) {
    let src;
    switch (instr) {
      case "hi-hat":
        src = "hiHat";
        break;
      case "bass-kick":
        src = "bassDrum";
        break;
      case "snare":
        src = "snare";
        break;
      case "sidestick":
        src = "snareSidestick";
        break;
      case "ride":
        src = "ride";
        break;
      case "ride-bell":
        src = "rideBell";
        break;
      case "click":
        src = "click";
        break;
      case "shake":
        src = "shake";
        break;
      case "cowbell-1":
        src = "cowbell1";
        break;
      case "cowbell-2":
        src = "cowbell2";
        break;
      case "timbale-1":
        src = "timbale1";
        break;
      case "timbale-2":
        src = "timbale2";
        break;
      case "metal":
        src = "metal";
        break;
      case "metal":
        src = "metal";
        break;
      case "woodblock":
        src = "woodblock";
        break;
      default:
        return;
    }

    const sound = new Audio(appSounds[src]);

    sound.play();
  }
}
