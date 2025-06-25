import { Component, inject } from '@angular/core';
import {
  EventPeriodicElement,
  PeriodicTable,
} from './periodic-table/periodic-table';
import { FilterInputComponent } from './filter-input/filter-input.component';
import { PeriodicFacadeService } from './periodic-facade.service';
@Component({
  selector: 'app-home',
  imports: [PeriodicTable, FilterInputComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
})
export class Home {
  periodicFacadeService = inject(PeriodicFacadeService);
  filterValue = this.periodicFacadeService.filterValue;
  filteredData = this.periodicFacadeService.filteredData;

  editElement(element: EventPeriodicElement) {
    this.periodicFacadeService.editElement(element);
  }
}
