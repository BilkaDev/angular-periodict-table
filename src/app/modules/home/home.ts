import { Component, computed, inject } from '@angular/core';
import {
  EventPeriodicElement,
  PeriodicTable,
} from './periodic-table/periodic-table';
import { PeriodicService } from '../core/services/periodic.service';
import { MatDialog } from '@angular/material/dialog';
import { PeriodicDialogComponent } from './periodic-dialog/periodic-dialog.component';
@Component({
  selector: 'app-home',
  imports: [PeriodicTable],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true,
})
export class Home {
  private periodicService = inject(PeriodicService);
  private dialog = inject(MatDialog);

  filteredData = computed(() => {
    return this.periodicService.elements();
  });
  editElement(element: EventPeriodicElement) {
    const dialogRef = this.dialog.open(PeriodicDialogComponent, {
      data: { ...element },
    });
    console.log(dialogRef);

    // dialogRef.afterClosed().subscribe((result: PeriodicElement | undefined) => {
    //   if (result) {
    //     this.elements.update(arr =>
    //       arr.map(e => (e.position === result.position ? result : e))
    //     );
    //   }
    // });
  }
}
