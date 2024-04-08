import { FormControl } from '@angular/forms';

export interface ProfileForm {
  firstName: FormControl<string | null>;
  password: FormControl<string | null>;
  iban: FormControl<string | null>;
}

export type Profile = {
  [key in keyof ProfileForm]: string | null;
};
