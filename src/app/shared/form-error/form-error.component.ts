import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css',
})
export class FormErrorComponent {
  @Input({ required: true }) control!: FormControl | AbstractControl | null;
}
