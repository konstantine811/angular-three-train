import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export const confirmedValidator = (
  controlName: string,
  checkControlName: string
) => {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlP = control.get(controlName);
    const checkControl = control.get(checkControlName);
    if (checkControl?.errors && !checkControl.errors['matching']) {
      return null;
    }
    if (controlP?.value !== checkControl?.value) {
      checkControl?.setErrors({ matching: true });
      return { matching: true };
    } else {
      return null;
    }
  };
};
