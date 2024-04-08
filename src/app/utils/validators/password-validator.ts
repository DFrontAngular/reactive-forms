import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * ^: Indica el inicio de la cadena.
 * (?=.*\d): Asegura que haya al menos un dígito.
 * (?=.*[A-Z]): Asegura que haya al menos una letra mayúscula.
 * (?=.*[a-z]): Asegura que haya al menos una letra minúscula.
 * (?=.*[ñÑ\-_¿.#¡]): Asegura que haya al menos un carácter especial (puedes agregar más caracteres especiales dentro de los corchetes si lo deseas).
 * .{8,15}: Acepta una longitud de contraseña entre 8 y 15 caracteres.
 * $: Indica el final de la cadena.
 */
const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ñÑ\-_¿.#¡*]).{8,15}$/
);

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    const passwordStrength = passwordRegex;
    const passwordValid = passwordStrength.test(value);

    return !passwordValid ? { passwordError: true } : null;
  };
}
