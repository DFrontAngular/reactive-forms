import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../shared/form-error/form-error.component';

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [FormErrorComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.css',
})
export class FormControlComponent implements OnInit {
  // Referencia necesaria para utilizarla con takeUntilDestroyed cuando llamamos
  // a la función fuera del contexto del constructor
  destroyRef = inject(DestroyRef);

  animals = ['Perro', 'Gato', 'Pájaro', 'León', 'Pez'];
  filteredAnimals: string[] = this.animals;

  // FORMA RÁPIDA DE DECLARAR LAS PROPIEDADES DEL FORM CONTROL
  // DE ESTA FORMA SOLO PODEMOS INDICAR EL VALOR INICIAL Y LOS VALIDADORES
  name = new FormControl('', [Validators.maxLength(255)]);

  // CON ESTA FORMA PODEMOS INDICAR LAS PROPIEDADES DE UNA FORMA MAS VISUAL
  // INCLUSO PODEMOS AÑADIR MAS PROPIEDADES QUE DE LA FORMA ANTERIOR NO PODRÍAMOS
  name2 = new FormControl(
    {
      disabled: false,
      value: '',
    },
    {
      validators: [Validators.maxLength(255)],
      asyncValidators: [],
      nonNullable: false,
      updateOn: 'change',
    }
  );

  ngOnInit(): void {
    // Nos podemos suscribir a los cambios del formulario. Este observable emitirá su valor
    // cada vez que el formControl cambie.
    this.name.valueChanges
      // muy importante describirnos de los valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((name) => this.filterAnimals(name));
  }

  filterAnimals(query: string | null) {
    if (query) {
      this.filteredAnimals = this.animals.filter((animal) =>
        animal.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredAnimals = this.animals;
    }
  }
}
