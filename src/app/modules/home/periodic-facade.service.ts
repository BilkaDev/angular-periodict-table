import { computed, inject, Injectable, signal } from '@angular/core';
import { PeriodicService } from '../core/services/periodic.service';
import { MatDialog } from '@angular/material/dialog';
import { EventPeriodicElement } from './periodic-table/periodic-table';
import { PeriodicDialogComponent } from './periodic-dialog/periodic-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PeriodicFacadeService {
  private periodicService = inject(PeriodicService);
  private dialog = inject(MatDialog);

  filterValue = signal('');
  filteredData = computed(() => {
    const filter = this.filterValue().toLowerCase();
    return this.periodicService
      .elements()
      .filter(e =>
        Object.values(e).some(val =>
          val.toString().toLowerCase().startsWith(filter)
        )
      );
  });

  editElement(element: EventPeriodicElement) {
    this.dialog.open(PeriodicDialogComponent, {
      data: { ...element },
    });
  }
}
