import { ManipulateDatabaseService } from './../../../../core/database/manipulate-database.service';
import { DatabaseService } from './../../../../core/database/database.service';
import { StringManipulationService } from './../../../../services/string-manipulation/string-manipulation.service';
import { Router } from '@angular/router';
import { ShowToastService } from './../../../../shared/utility/toast/show-toast.service';
import { ToastListService } from 'src/app/services/toastList/toast-list.service';
import { ToastComponent } from 'src/app/shared/utility/toast/toast.component';
import { DOCUMENT } from '@angular/common';
import { CustomValidators } from '../../shared/customvalidators/CustomValidators';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/models/user/user.model';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  @ViewChild(ToastComponent) toast: any;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private toastList: ToastListService,
    private auth: AuthService,
    private showToastService: ShowToastService,
    private router: Router,
    private manipulateString: StringManipulationService,
    private db: DatabaseService,
    private manipulateDB: ManipulateDatabaseService
  ) {
    this.signUpForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.createForm();
  }

  log() {
    console.log(this.signUpForm.controls);
  }

  createForm() {
    this.signUpForm = new FormGroup(
      {
        _firstName: new FormControl(null, [Validators.required]),
        _lastName: new FormControl(null, [Validators.required]),
        _email: new FormControl(null, [Validators.required]),
        _password: new FormControl(null, [Validators.required]),
        _confirmPassword: new FormControl(null, [Validators.required]),
      },
      CustomValidators.mustMatch('_password', '_confirmPassword')
    );
  }

  onSignUpSubmit() {
    if (this.validateForm() == true) {
      this.auth
        .signUp(
          this.signUpForm.controls['_email'].value,
          this.signUpForm.controls['_password'].value
        )
        .pipe(
          tap((x) => console.log('result', x)),
          switchMap((result) => {
            let user = new User(result.user.uid, this.signUpForm.value);
            localStorage.setItem('user', JSON.stringify(user));
            console.log('user', user);
            return this.manipulateDB.setUserInfo(user);
          }),
          tap(() => {
            this.showToastService.openSnackBar('Signed in successfully', '');
            this.router.navigate(['/homepage']);
          })
        )
        .subscribe({
          next: () => {},
          error: (error) => {
            console.log(error);
            this.showToastService.openSnackBar(
              this.manipulateString.spliceError(error),
              ''
            );
          },
        });
    }
  }

  checkConfirmPassword() {
    if (this.signUpForm.errors && this.signUpForm.errors['mustMatch']) {
      this.toast.showToast(this.toastList.toast_error_passwordNotMatch);
      return false;
    }
    return true;
  }

  checkIfError_required(): boolean {
    if (CustomValidators.isError_Required(this.signUpForm)) {
      this.toast.showToast(this.toastList.toast_error_required);
      return false;
    }
    return true;
  }

  validateForm(): boolean {
    if (this.checkIfError_required() == false) {
      return false;
    }
    if (this.checkConfirmPassword() == false) {
      return false;
    }
    return true;
  }
}
