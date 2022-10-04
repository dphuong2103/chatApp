import { ManipulateDatabaseService } from 'src/app/core/database/manipulate-database.service';
import { StringManipulationService } from './../../../../services/string-manipulation/string-manipulation.service';
import { ShowToastService } from './../../../../shared/utility/toast/show-toast.service';
import { AngularMatDialogComponent } from './../../../../shared/utility/angular-mat-dialog/angular-mat-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from './../../../../core/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { take, Observable, Subscription, switchMap, tap } from 'rxjs';
import { User } from 'src/app/core/models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  googleSignInSubscription?: Subscription;
  isEmailFocus = false;
  isPasswordFocus = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public auth: AuthService,
    private router: Router,
    private showToastService: ShowToastService,
    private manipulateString: StringManipulationService,
    private manipulateDB: ManipulateDatabaseService
  ) {}
  ngOnDestroy(): void {
    this.googleSignInSubscription?.unsubscribe;
  }
  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  ngOnInit(): void {
    this.auth.checkIfLoggedAndRedirect();
    this.createForm();
  }

  log(data: any) {
    console.log(data);
  }

  toggleForgotPasswordModal() {
    if (
      this.document
        .querySelector('.forgotPassword-modal')
        ?.classList.contains('show')
    ) {
      this.document
        .querySelector('.forgotPassword-modal')
        ?.classList.remove('show');
    } else {
      this.document
        .querySelector('.forgotPassword-modal')
        ?.classList.add('show');
    }
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }

  signInWithEmail() {
    this.auth
      .signInWithEmail(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      )
      .pipe(
        take(1),
        switchMap((result) => this.manipulateDB.getUserInfo(result.user?.uid!)),
        tap((user) => {
          localStorage.setItem('user', JSON.stringify(user));

          this.router.navigate(['/homepage']);
          this.showToastService.openSnackBar('Welcome back', '');
        })
      )
      .subscribe({
        next: () => {},
        error: (error) => {
          if (error.message != 'Firebase: Error (auth/missing-email).') {
            this.showToastService.openSnackBar(
              this.manipulateString.spliceError(error),
              ''
            );
          }
        },
      });
  }

  forgotPassword() {
    this.auth.forgotPassword(this.forgotPasswordForm.controls['email'].value);
  }

  googleSignIn() {
    this.googleSignInSubscription = this.auth.googleSignIn().subscribe();
  }
}
