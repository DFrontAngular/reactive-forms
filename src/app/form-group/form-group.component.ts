import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IbanValidatorService } from '../services/iban-validator.service';
import { FormErrorComponent } from '../shared/form-error/form-error.component';
import { ProfileForm } from './models/profile-form.form';

@Component({
  selector: 'app-form-group',
  standalone: true,
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css',
  imports: [ReactiveFormsModule, FormErrorComponent, JsonPipe],
})
export class FormGroupComponent implements OnInit {
  #ibanValidator = inject(IbanValidatorService);

  #fb = inject(FormBuilder);
  // #nonNullableFb = inject(NonNullableFormBuilder);

  profileForm = new FormGroup<ProfileForm>({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    iban: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [this.#ibanValidator.validate.bind(this.#ibanValidator)],
      updateOn: 'blur',
    }),
  });

  profileForm2 = this.#fb.group<ProfileForm>({
    firstName: this.#fb.control(''),
    iban: this.#fb.control(''),
  });

  get firstName() {
    return this.profileForm.get('firstName') as FormControl<string | null>;
  }

  get iban() {
    return this.profileForm.get('iban') as FormControl<string | null>;
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.profileForm.invalid) {
      // Se utiliza para marcar a TODOS los descendientes como Touched
      this.profileForm.markAllAsTouched();

      // utilizaremos markAsTouched cuando solo queremos marcar un control en concreto,
      // por ejemplo:
      // this.firstName.markAsTouched()

      return;
    }

    alert(`Nombre: ${this.firstName.value}, Iban: ${this.iban.value}`);
  }
}
