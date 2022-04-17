import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

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
}
