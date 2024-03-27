import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root',
})
export class IbanValidatorService implements AsyncValidator {
  #validationSrv = inject(ValidationService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of({ isIbanInvalid: true });
    }

    return this.#validationSrv.validateIban(control.value).pipe(
      map((valid) => (!valid ? { isIbanInvalid: true } : null)),
      catchError(() => of({ isIbanInvalid: true }))
    );
  }
}
