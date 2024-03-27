import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Iban } from './models/iban.model';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  #http = inject(HttpClient);

  validateIban(iban: string) {
    return this.#http
      .get<Iban>(`https://openiban.com/validate/${iban}`)
      .pipe(map((res) => res.valid));
  }
}
