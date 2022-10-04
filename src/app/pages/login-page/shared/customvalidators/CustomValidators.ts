
import {
  AbstractControl,
  ValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

import { Toast } from '../interfaces/toast';

export class CustomValidators {
  constructor() {}

  static mustMatch(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
     
      const formGroup = control as FormGroup;

      const formControl = formGroup.get(controlName);
      const matchingFormControl = formGroup.get(matchingControlName);

      if (formControl?.value == matchingFormControl?.value) {
        return null;
      } else return { mustMatch: true };
    };

  }

  static isError_Required(formGroup: FormGroup): boolean {
    let isError = false;
    Object.keys(formGroup.controls).forEach((key) => {
      if (formGroup.get(key)) {
        const abstractControl = formGroup.get(key);
        if (abstractControl instanceof FormGroup) {
        } else if (abstractControl instanceof FormControl) {
          if (abstractControl.errors && abstractControl.errors['required']) {
            isError = true;
          }
        }
      }
    });
    return isError;
  }


}
