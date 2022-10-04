import { Injectable } from '@angular/core';
import { Toast } from 'src/app/pages/login-page/shared/interfaces/toast';
@Injectable({
  providedIn: 'root',
})
export class ToastListService {
  toast_error_required: Toast;
  toast_error_passwordNotMatch: Toast;
  constructor() {
    this.toast_error_required = {
      message: 'Please input required fields.',
      title: 'Fail!',
      time: 3000,
      isShown: false,
    };
    this.toast_error_passwordNotMatch = {
      message: 'Confirm password not match. Please try again!',
      title: 'Failed!',
      time: 3000,
      isShown: false,
    };
  }
}
