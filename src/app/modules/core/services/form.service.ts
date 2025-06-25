import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PeriodicForm } from '../models/forms.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  initPeriodicForm(): FormGroup<PeriodicForm> {
    return new FormGroup({
      position: new FormControl(0, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      symbol: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(3)],
        nonNullable: true,
      }),
      weight: new FormControl(0, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    if (control.hasError('invalidPosition')) {
      return 'Position is already taken';
    }
    if (control.hasError('maxlength')) {
      return `Maximum length is ${control.errors?.['maxlength'].requiredLength}`;
    }
    return '';
  }
}
