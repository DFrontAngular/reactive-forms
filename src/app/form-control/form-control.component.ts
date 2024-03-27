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

  name = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.name.valueChanges
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
