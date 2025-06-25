import { FormControl } from '@angular/forms';

export interface PeriodicForm {
  name: FormControl<string>;
  symbol: FormControl<string>;
  weight: FormControl<number>;
  position: FormControl<number>;
}
