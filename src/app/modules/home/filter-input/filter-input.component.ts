import { Component, Input, OnDestroy, WritableSignal } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { debounceTime, Subject, tap } from 'rxjs';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-filter-input',
  imports: [MatFormField, MatLabel, MatInput, MatProgressBar],
  templateUrl: './filter-input.component.html',
  standalone: true,
  styleUrl: './filter-input.component.scss',
})
export class FilterInputComponent implements OnDestroy {
  @Input() filterValue!: WritableSignal<string>;
  private filterInput$ = new Subject<string>();
  determinateValue = 0;
  private determinateInterval: number | undefined;

  constructor() {
    this.filterInput$
      .pipe(
        tap(() => {
          if (this.determinateInterval) {
            this.clearInterval();
          }
          this.startProgress();
        }),
        debounceTime(2000)
      )
      .subscribe(value => {
        this.filterValue.set(value.toLowerCase());
        this.clearInterval();
      });
  }
  onFilterInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterInput$.next(value);
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  clearInterval() {
    if (this.determinateInterval) {
      clearInterval(this.determinateInterval);
      this.determinateValue = 0;
    }
  }
  startProgress() {
    this.determinateValue = 0;
    this.determinateInterval = setInterval(() => {
      if (this.determinateValue > 100) {
        this.clearInterval();
      }
      this.determinateValue += 5;
    }, 100);
  }
}
