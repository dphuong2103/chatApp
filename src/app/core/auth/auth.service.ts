import { User } from 'src/app/core/models/user/user.model';
import { ManipulateDatabaseService } from './../database/manipulate-database.service';
import { DatabaseService } from './../database/database.service';
import { ShowToastService } from './../../shared/utility/toast/show-toast.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, switchMap, Observable, defer, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  object = {
    firstName: '1',
    lastName: '2',
    email: '13',
  };
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private showToast: ShowToastService,
    private db: DatabaseService,
    private manipulateDB: ManipulateDatabaseService
  ) {}

  googleSignIn() {
    return from(this.auth.signInWithPopup(new GoogleAuthProvider())).pipe(
      switchMap((result) => {
        let userInfo = {
          _firstName: '',
          _lastName: '',
          _uid: result.user?.uid || '',
          _displayName: result.user?.displayName || '',
          _email: result.user?.email || '',
          _photoURL: result.user?.photoURL || '',
        };

        localStorage.setItem('user', JSON.stringify(userInfo));

        return this.manipulateDB.setUserInfo(
          new User(result.user!.uid, userInfo)
        );
      }),
      tap((result) => this.router.navigate(['/homepage']))
    );
  }

  currentUser() {
    if (this.isLoggedIn()) {
      let user = JSON.parse(String(localStorage.getItem('user')));

      return user;
    }
    return;
  }

  currentUserID() {
    if (this.currentUser()) {
      return this.currentUser()._uid;
    }
    return;
  }

  signOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/loginPage']);
    });
  }

  isLoggedIn() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  checkIfLoggedAndRedirect() {
    this.isLoggedIn() ? this.router.navigate(['/homepage']) : '';
  }

  signUp(email: string, password: string): Observable<any> {
    return defer(() =>
      from(this.auth.createUserWithEmailAndPassword(email, password))
    );
  }

  signInWithEmail(email: string, password: string) {
    return defer(() =>
      from(this.auth.signInWithEmailAndPassword(email, password))
    );
  }

  openDialog() {
    this.showToast.data = {
      title: 'Failed',
      message: 'Password is incorrect, please try again',
    };
    this.showToast.openDialog();
  }

  forgotPassword(email: string) {
    return this.auth
      .sendPasswordResetEmail(email)
      .then((result) => {
        this.showToast.openSnackBar('Successfully Please check your email', '');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
