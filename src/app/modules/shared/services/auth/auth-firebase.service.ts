import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// firebase
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
// models
import { User } from '@shared/models/auth/user';
import { IFormMessage } from '@core/models/auth-form.model';
// config
import { APP_ROUTES } from '@core/config/app-route.config';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
  userData: any;
  private readonly localUserName = 'user';

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.logUser();
  }

  get isLoggedIn(): boolean {
    const userStorage = localStorage.getItem(this.localUserName);
    if (userStorage) {
      const user = JSON.parse(userStorage);
      return user !== null && user.emailVerified !== false ? true : false;
    }
    return false;
  }

  get userId(): string | null {
    const userStorage = localStorage.getItem(this.localUserName);
    if (userStorage) {
      const user = JSON.parse(userStorage);
      return user !== null && user.uid;
    }
    return null;
  }

  logUser() {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem(this.localUserName, JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem(this.localUserName)!);
      } else {
        localStorage.setItem(this.localUserName, 'null');
        JSON.parse(localStorage.getItem(this.localUserName)!);
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate([
              `${APP_ROUTES.dashboard.name}/${APP_ROUTES.dashboard.children.portfolio}`,
            ]);
          }
        });
      })
      .catch((error) => {
        return error.message;
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();

        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate([
          `${APP_ROUTES.auth.name}/${APP_ROUTES.auth.children.verifyEmail}`,
        ]);
      });
  }

  forgotPassoword(passwordResetEmail: string): Promise<IFormMessage> {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        const message = 'Password reset email sent, check your inbox.';
        window.alert(message);
        return { isError: false, message };
      })
      .catch((error) => {
        window.alert(error);
        return { isError: true, message: error as string };
      });
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem(this.localUserName);
      this.router.navigate([
        `${APP_ROUTES.auth.name}/${APP_ROUTES.auth.children.signIn}`,
      ]);
    });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs
      .collection('users')
      .doc(user.uid);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef
      .set(userData, {
        merge: true,
      })
      .catch((error) => {
        console.log('set user data error: ', error);
      });
  }

  getUserData() {
    const userId = this.userId;
    if (userId) {
      const userRef: AngularFirestoreDocument<any> = this.afs
        .collection('users')
        .doc(userId);
      userRef.valueChanges().subscribe((data) => {
        console.log('data user', data);
      });
    }
  }
}
