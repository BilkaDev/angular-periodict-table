import { Component, Input } from '@angular/core';

interface Data {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-periodict-table',
  imports: [],
  templateUrl: './periodic-table.html',
  standalone: true,
  styleUrl: './periodic-table.scss',
})
export class PeriodicTable {
  @Input() data: Data[] = [];
}
