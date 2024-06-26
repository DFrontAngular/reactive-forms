import { DatePipe, JsonPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormErrorComponent } from '../shared/form-error/form-error.component';
import { CustomValidators } from '../utils/validators/custom-validators';
import {
  Address,
  AddressForm,
  Student,
  StudentForm,
} from './models/student.form';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent, DatePipe, JsonPipe, NgFor],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.css',
})
export class FormArrayComponent implements OnInit {
  #fb = inject(FormBuilder);

  limitDate = new Date().toISOString().split('T')[0];

  studentForm = this.#fb.group<StudentForm>({
    name: this.#fb.control(''),
    birthDate: this.#fb.control(null, {
      validators: [CustomValidators.limitDate(new Date(this.limitDate))],
    }),
    address: this.#fb.array<FormGroup<AddressForm>>([]),
  });

  get name() {
    return this.studentForm.get('name') as FormControl<string | null>;
  }
  get birthDate() {
    return this.studentForm.get('birthDate') as FormControl<string | null>;
  }
  get address() {
    return this.studentForm.get('address') as FormArray<FormGroup<AddressForm>>;
  }

  ngOnInit(): void {
    this.populateForm();
  }

  addAddress(address: Address = { city: '', street: '', zipCode: null }) {
    const addressGroup = this.#fb.group<AddressForm>({
      city: this.#fb.control(address.city),
      street: this.#fb.control(address.street),
      zipCode: this.#fb.control(address.zipCode),
    });

    this.address.push(addressGroup);
  }

  removeAddress(index: number) {
    this.address.removeAt(index);
  }

  onSubmit() {
    console.log(this.studentForm.value);
  }

  populateForm() {
    const studentDataFromDb: Student = {
      name: 'John Doe',
      birthDate: this.limitDate,
      address: [
        {
          city: 'Sevilla',
          street: 'Américo Vespucio',
          zipCode: 41200,
        },
      ],
    };

    this.studentForm.patchValue(studentDataFromDb);
    // MUY IMPORTANTE LLAMAR A CLEAR ANTES, YA QUE DEJA EL FORM ARRAY VACÍO
    // ASI EVITAMOS QUE SI SE LLAMA A ESTE MÉTODO MUCHAS VECES NO SE REPITE EL LLENADO DEL FORM ARRAY
    this.address.clear();
    studentDataFromDb.address.forEach((address) => this.addAddress(address));
  }
}
