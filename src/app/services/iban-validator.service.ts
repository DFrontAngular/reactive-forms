import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { OpenIbanApiService } from './open-iban-api.service';

@Injectable({
  providedIn: 'root',
})
export class IbanValidatorService implements AsyncValidator {
  #openIbanApi = inject(OpenIbanApiService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.#openIbanApi.validateIban(control.value).pipe(
      map((valid) => (!valid ? { isIbanInvalid: true } : null)),
      catchError(() => of({ isIbanInvalid: true }))
    );
  }
}
