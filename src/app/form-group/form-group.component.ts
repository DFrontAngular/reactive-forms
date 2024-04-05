import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IbanValidatorService } from '../services/iban-validator.service';
import { FormErrorComponent } from '../shared/form-error/form-error.component';
import { createPasswordStrengthValidator } from '../utils/validators/password-validator';
import { Profile, ProfileForm } from './models/profile.form';

@Component({
  selector: 'app-form-group',
  standalone: true,
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css',
  imports: [ReactiveFormsModule, FormErrorComponent, JsonPipe],
})
export class FormGroupComponent implements OnInit {
  #fb = inject(FormBuilder);
  #nonNullableFb = inject(NonNullableFormBuilder);

  #ibanValidator = inject(IbanValidatorService);

  // Es muy importante iniciar el formulario directamente, o al menos declararle el tipo
  // nunca hacer y posteriormente inicializarlo en una funcion, porque nuestro formulario
  // sería tipo any
  profileFormAny!: FormGroup;

  formInitializedWithMethod = this.initializeForm();

  profileForm = new FormGroup<ProfileForm>({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    password: new FormControl('', {
      // IMPORTANTE LLAMAR A LA FUNCIÓN, NO ES SIMPLEMENTE PONERLA
      validators: [createPasswordStrengthValidator()],
    }),
    iban: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [this.#ibanValidator.validate.bind(this.#ibanValidator)],
      updateOn: 'blur',
    }),
  });

  profileForm2 = this.#fb.group<ProfileForm>({
    firstName: this.#fb.control(''),
    password: this.#fb.control(''),
    iban: this.#fb.control(''),
  });

  // Eso no es posible, porque esta mezclando la forma antigua con la nueva
  // si queremos usar el [''] debemos quitarle la interfaz
  // profileForm3 = this.#fb.group<ProfileForm>({
  //   firstName: [''],
  //   password: [''],
  //   iban: [''],
  // });

  get firstName() {
    return this.profileForm.get('firstName') as FormControl<string | null>;
  }

  get password() {
    return this.profileForm.get('password') as FormControl<string | null>;
  }

  get iban() {
    return this.profileForm.get('iban') as FormControl<string | null>;
  }

  initializeForm(): FormGroup<ProfileForm> {
    return new FormGroup<ProfileForm>({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', {
        validators: [createPasswordStrengthValidator],
      }),
      iban: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [
          this.#ibanValidator.validate.bind(this.#ibanValidator),
        ],
        updateOn: 'blur',
      }),
    });
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

  patchForm(profile: Profile) {
    // Si utilizamos setValue debemos proporcionar el objeto completo. Dando error si el modelo
    // que le pasamos no tiene el mismo modelo que el formulario.
    this.profileForm.setValue(profile);

    // Al utilizar patchValue podemos asignar solo partes del objeto que queramos
    this.profileForm.patchValue({
      firstName: profile.firstName,
    });
  }
}
