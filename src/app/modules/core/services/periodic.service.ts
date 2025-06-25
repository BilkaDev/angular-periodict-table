import { computed, Injectable, signal } from '@angular/core';
import { Periodic } from '../models/periodic.model';
import { delay, of, tap } from 'rxjs';

const ELEMENT_DATA: Periodic[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Injectable({
  providedIn: 'root',
})
export class PeriodicService {
  private _loading = signal(true);
  private _elements = signal<Periodic[]>([]);
  private _loadedData = signal(false);

  loading = computed(() => this._loading());
  elements = computed(() => this._elements());
  loadedData = computed(() => this._loadedData());

  constructor() {
    this.loadElements();
  }

  loadElements() {
    this._loading.set(true);
    of(ELEMENT_DATA)
      .pipe(delay(1000))
      .subscribe(data => {
        this._elements.set(data);
        this._loadedData.set(true);
        this._loading.set(false);
      });
  }

  updatePeriodic(position: number, dto: Periodic) {
    this._loading.set(true);
    return of(ELEMENT_DATA).pipe(
      delay(1000),
      tap(() => {
        if (this.validatePosition(position, dto.position)) {
          this._elements.update(arr =>
            arr.map(e => (e.position === position ? { ...e, ...dto } : e))
          );
        } else {
          this._loading.set(false);
          throw new Error('Invalid position');
        }
        this._loading.set(false);
      })
    );
  }

  validatePosition(oldPosition: number, newPosition: number): boolean {
    if (oldPosition === newPosition) {
      return true;
    }
    const elements = this._elements();
    return !elements.some(element => element.position === newPosition);
  }
}
