import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringManipulationService {
  constructor() {}

  spliceError(error: any) {
    let errorMessage = error.message;
    errorMessage = errorMessage.replace('Firebase: ', '');
    errorMessage = errorMessage.replace(` (${error['code']}).`, '');
    return errorMessage;
  }
}

