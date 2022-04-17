import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  userData: any;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(userData => resolve(userData),
        err => reject(err));
    });
  }

  async logout() {
    await this.afAuth.signOut();
    window.alert('You are logged out');
  }

  getAuth() {
    return this.afAuth.authState.pipe(auth => auth);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null) ? true : false;
  }
}
