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
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { debounceTime, map, tap, throttleTime } from "rxjs/operators";

@Component({
  selector: "app-live-examples",
  templateUrl: "./live-examples.component.html",
  styleUrls: ["./live-examples.component.scss"],
})
export class LiveExamplesComponent implements OnInit {
  @ViewChildren("form", { read: ElementRef }) notes: QueryList<any>;
  tempo = 100;
  timeSignature = 4;
  isPlaying = false;
  click;
  timeSignature$ = new BehaviorSubject(4);
  beatLength$: Observable<any[]>;
  form: FormGroup;
  instruments = ["hi-hat", "snare", "bass-kick"];

  constructor(private fb: FormBuilder, private r: Renderer2) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tempo: [100, Validators.max(300)],
      timeSignature: [4],
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

    // this.beatLength$.pipe(
    //   map((d) => (d.length = this.timeSignature * 4)),
    //   tap((d) => console.log(d))
    // );
  }

  onSubmit() {}

  setNote(beat, position) {
    console.log(beat + 1);
    console.log(position + 1);
    console.log(this.notes);

    // console.log((position + 1) * (beat + 1));

    // this.notes.forEach((note) => console.log(note));

    const notes = document.querySelectorAll(".d");
    console.log(notes);
    // this.r.addClass(notes[i], "note");
    // console.log(e.target);
    // this.r.addClass(this, "note");
  }

  handleLoop() {
    this.isPlaying = !this.isPlaying;

    if (!this.isPlaying) {
      return;
    }
  }

  animate() {
    document.querySelector("");
  }
}

function sound(src) {}
