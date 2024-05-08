import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface StudentForm {
  name: FormControl<string | null>;
  birthDate: FormControl<string | null>;
  address?: FormArray<FormGroup<AddressForm>>;
}

export type Student = {
  name: string | null;
  birthDate: string | null;
  address: Address[];
};

export interface AddressForm {
  street: FormControl<string | null>;
  zipCode: FormControl<number | null>;
  city: FormControl<string | null>;
}

export type Address = {
  street: string | null;
  zipCode: number | null;
  city: string | null;
};
