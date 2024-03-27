import { FormControl } from '@angular/forms';

export interface ProfileForm {
  firstName: FormControl<string | null>;
  iban: FormControl<string | null>;
}
