import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from  'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private token: string;

  constructor(
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  signinUser(email: string, password: string) {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/catalog']);
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => this.token = token
          );
        }
      )
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
