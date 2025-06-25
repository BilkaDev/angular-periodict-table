import { Component, inject } from '@angular/core';
import { Periodic } from '../../core/models/periodic.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { FormService } from '../../core/services/form.service';
import { PeriodicForm } from '../../core/models/forms.model';
import { PeriodicService } from '../../core/services/periodic.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-periodic-dialog.component',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    MatProgressSpinner,
  ],
  templateUrl: './periodic-dialog.component.html',
  styleUrl: './periodic-dialog.component.scss',
  standalone: true,
})
export class PeriodicDialogComponent {
  readonly dialogRef = inject(MatDialogRef<PeriodicDialogComponent>);
  readonly data: Periodic = inject(MAT_DIALOG_DATA);
  private formService = inject(FormService);
  private periodicService = inject(PeriodicService);
  public form: FormGroup<PeriodicForm>;

  constructor() {
    this.form = this.formService.initPeriodicForm();
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }
  get controls() {
    return this.form.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  get isLoading() {
    return this.periodicService.loading();
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.periodicService
        .updatePeriodic(this.data.position, this.form.getRawValue())
        .subscribe({
          next: () => this.dialogRef.close(),
          error: () => {
            this.controls['position'].setErrors({
              invalidPosition: true,
            });
          },
        });
    }
  }
}
