import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgTemplateOutlet } from '@angular/common';

interface Data {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}
export type EventPeriodicElement = Data;

@Component({
  selector: 'app-periodic-table',
  imports: [MatIconButton, MatIcon, MatProgressSpinner, NgTemplateOutlet],
  templateUrl: './periodic-table.html',
  standalone: true,
  styleUrl: './periodic-table.scss',
})
export class PeriodicTable {
  @Input() data: Data[] = [];
  @Input() isLoaded = false;
  @Output() edit = new EventEmitter<EventPeriodicElement>();

  get isEmpty(): boolean {
    return this.data?.length === 0;
  }

  editElement(el: EventPeriodicElement) {
    this.edit.emit(el);
  }

  get sortedData(): Data[] {
    return [...this.data].sort((a, b) => a.position - b.position);
  }
}
