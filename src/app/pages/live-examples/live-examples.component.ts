import { Component, OnInit } from "@angular/core";
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
  tempo = 100;
  timeSignature = 4;
  isPlaying = false;
  timeSignature$ = new BehaviorSubject(4);
  beatLength$: Observable<any[]>;
  form: FormGroup;
  instruments = ["hi-hat", "snare", "bass-kick"];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.timeSignature$.pipe(debounceTime(300)).subscribe((time) => {
      const arr = [];
      arr.length = time;
      this.beatLength$ = of(arr);
    });

    this.form = this.fb.group({
      tempo: [100, Validators.max(300)],
      timeSignature: [4],
    });

    this.form.valueChanges.pipe(debounceTime(300)).subscribe((formValue) => {
      console.log(formValue);
      this.timeSignature$.next(formValue["timeSignature"]);
    });

    // this.beatLength$.pipe(
    //   map((d) => (d.length = this.timeSignature * 4)),
    //   tap((d) => console.log(d))
    // );
  }

  onSubmit() {}

  handleLoop() {
    this.isPlaying = !this.isPlaying;
  }

  animate() {
    document.querySelector("");
  }
}
