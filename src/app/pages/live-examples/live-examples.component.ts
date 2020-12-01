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
import { appDemoSounds as appSounds } from "./app.sounds.demo";

interface note {}

@Component({
  selector: "app-live-examples",
  templateUrl: "./live-examples.component.html",
  styleUrls: ["./live-examples.component.scss"],
})
export class LiveExamplesComponent implements OnInit {
  // @ViewChildren("form", { read: ElementRef }) notes: QueryList<any>;
  tempo = 100;
  timeSignature = 2;
  isPlaying$ = new BehaviorSubject<boolean>(false);
  isPlaying = false;
  clickOn = true;
  click;
  timeSignature$ = new BehaviorSubject(2);
  measureLength$: Observable<any[]>;
  form: FormGroup;
  // instruments = ["hi-hat", "snare", "bass-kick"];

  constructor(private fb: FormBuilder, private r: Renderer2) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tempo: [100, [Validators.max(300), Validators.min(40)]],
      timeSignature: [this.timeSignature],
      clickOn: [this.clickOn],
    });

    this.form.valueChanges.pipe(debounceTime(300)).subscribe((formValue) => {
      console.log(formValue);
      this.timeSignature$.next(formValue["timeSignature"]);
      this.clickOn = formValue["clickOn"];
      this.tempo = formValue["tempo"];
    });

    this.timeSignature$.pipe(debounceTime(300)).subscribe((timeSig) => {
      const arr = [];
      arr.length = timeSig;
      this.measureLength$ = of(arr);
    });
  }

  onSubmit() {}

  addInstrumentTrack() {}

  removeInstrumentTrack() {}

  toggleLoop() {
    this.isPlaying = !this.isPlaying;
    console.log("is playing ->" + this.isPlaying);
    const notes = document.querySelectorAll(".note");

    // pause
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

      // som do click
      if (i % 4 === 0 && this.clickOn) {
        let clickSound = new Audio(appSounds.click);
        clickSound.play();
      }

      if (
        notes[i].classList.contains("current") &&
        notes[i].classList.contains("clicked")
      ) {
        let instrumentSonud = new Audio(appSounds.bassDrum);
        instrumentSonud.play();
      }

      if (i < notes.length - 1) {
        i++;
      } else {
        i = 0;
      }
    }, (60 / 4 / this.tempo) * 1000);
  }
}
