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
  private periodicFacadeService = inject(PeriodicFacadeService);

  public filterValue = this.periodicFacadeService.filterValue;
  public filteredData = this.periodicFacadeService.filteredData;
  public isLoadedData = this.periodicFacadeService.isLoadedDate;

  public editElement(element: EventPeriodicElement) {
    this.periodicFacadeService.editElement(element);
  }
}
