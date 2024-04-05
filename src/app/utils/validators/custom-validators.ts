import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static limitDate(date: Date): ValidatorFn {
    return limitDate(date);
  }
}

export function limitDate(date: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = new Date(control.value);

    if (!value || isNaN(value.getTime())) {
      return { invalidDate: true };
    }

    if (value >= date) {
      return { limitDate: date };
    }

    return null;
  };
}
