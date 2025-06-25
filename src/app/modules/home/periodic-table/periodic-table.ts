import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

interface Data {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}
export type EventPeriodicElement = Data;

@Component({
  selector: 'app-periodic-table',
  imports: [MatIconButton, MatIcon],
  templateUrl: './periodic-table.html',
  standalone: true,
  styleUrl: './periodic-table.scss',
})
export class PeriodicTable {
  @Input() data: Data[] = [];
  @Output() edit = new EventEmitter<EventPeriodicElement>();

  editElement(el: EventPeriodicElement) {
    this.edit.emit(el);
  }
}
