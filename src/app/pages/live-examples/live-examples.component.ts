import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { BehaviorSubject, from, interval, Observable, of } from "rxjs";
import { debounceTime, map, tap, throttleTime } from "rxjs/operators";

@Component({
  selector: "app-live-examples",
  templateUrl: "./live-examples.component.html",
  styleUrls: ["./live-examples.component.scss"],
})
export class LiveExamplesComponent implements OnInit {
  @ViewChildren("form", { read: ElementRef }) notes: QueryList<any>;
  tempo = 100;
  timeSignature = 2;
  isPlaying$ = new BehaviorSubject<boolean>(false);
  isPlaying = false;
  click;
  timeSignature$ = new BehaviorSubject(2);
  beatLength$: Observable<any[]>;
  form: FormGroup;
  instruments = ["hi-hat", "snare", "bass-kick"];

  constructor(private fb: FormBuilder, private r: Renderer2) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tempo: [100, Validators.max(300)],
      timeSignature: [this.timeSignature],
    });

    this.form.valueChanges.pipe(debounceTime(300)).subscribe((formValue) => {
      console.log(formValue);
      this.timeSignature$.next(formValue["timeSignature"]);
    });

    this.timeSignature$.pipe(debounceTime(300)).subscribe((timeSig) => {
      const arr = [];
      arr.length = timeSig;
      this.beatLength$ = of(arr);
    });
  }

  onSubmit() {}

  selectNote(beat, position) {
    let selectedNotes = [];

    console.log(beat + 1);
    console.log(position + 1);

    let clickedBeatIndex = beat * 4 + position;
    console.log(clickedBeatIndex);

    const notes = document.querySelectorAll(".d");
    console.log(notes);

    notes[clickedBeatIndex].classList.contains("clicked")
      ? notes[clickedBeatIndex].classList.remove("clicked")
      : notes[clickedBeatIndex].classList.add("clicked");
  }

  handleLoop() {
    this.isPlaying = !this.isPlaying;
    console.log("is playing ->" + this.isPlaying);
    const notes = document.querySelectorAll(".d");

    if (!this.isPlaying) {
      notes.forEach((note, i) => {
        notes[i].classList.contains("current")
          ? notes[i].classList.remove("current")
          : null;
      });
      clearInterval(this.click);
      return;
    }

    // controle do loop
    let i = 0;
    this.click = setInterval(() => {
      notes[i].classList.add("current");

      if (i !== 0) {
        notes[i - 1].classList.remove("current");
      }

      if (i === 0) {
        notes[notes.length - 1].classList.remove("current");
      }

      if (i === notes.length) {
        notes[0].classList.add("current");
      }

      if (i < notes.length - 1) {
        i++;
      } else {
        i = 0;
      }
    }, (30 / this.tempo) * 1000);
  }

  animate() {
    document.querySelector("");
  }
}

function sound(src) {}
