import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Tab1Page } from '../tab1/tab1.page';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Injectable()
export class AuthenticateService {
  [x: string]: any;
  userState: any;
  constructor(private firestore: AngularFirestore, public router: Router,
              public afAuth: AngularFireAuth,
              private toastController: ToastController) { }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['<!-- enter your route name here -->']);
      });
  }

  // registerUser(email: string, password: string) {
  // return new Promise<any>((resolve, reject) => {
  //  firebase.auth().createUserWithEmailAndPassword(email, password)
  ///    .then(
  ///      res => resolve(res),
  ///       err => reject(err));
  //});
  // }


  // Sign up with email/password
  registerUser(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail(); // Sending email verification notification, when new user registers
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // loginUser(value) {
  //  return new Promise<any>((resolve, reject) => {
  //    firebase.auth().signInWithEmailAndPassword(value.email, value.password)
  //      .then(
  //        res => resolve(res),
  //       err => reject(err));
  //
  // });
  // }
  // Sign in with email/password
  loginUser(value) {
    return this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
      .then(async (result) => {
        if (result.user.emailVerified !== true) {
          this.SendVerificationMail();
          const toast = await this.toastController.create({
            message: 'Un email vous a été envoyé.',
            position: 'middle',
            duration: 6000
          });
        } else {
            this.router.navigate(['<!-- enter your route name here -->']);
        }
        // this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }
  resetPassword(value) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(value.email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .then(() => {
            return firebase.auth().currentUser;
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    });
  }

  userDetails() {
    return firebase.auth().currentUser;
  }
}
