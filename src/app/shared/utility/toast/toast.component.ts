import { Component, Input, OnInit } from '@angular/core';
import { Toast } from 'src/app/pages/login-page/shared/interfaces/toast';
@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  toast: Toast = {
    isShown: false,
    message: '',
    title: '',
    time: 0,
  };

  constructor() {}

  ngOnInit(): void {}

  showToast(toast: Toast) {
    toast.isShown = true;
    this.toast = toast;
    setTimeout(() => {
      this.toast.isShown = false;
    },toast.time);
  }
}
