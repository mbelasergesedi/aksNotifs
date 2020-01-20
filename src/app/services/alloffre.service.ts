import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AllOffresComponent } from '../all-offres/all-offres.component';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class AllOffService {
  private dbPath = '/offres';
  customerRef: AngularFireList<AllOffresComponent> = null;
  constructor(private firestore: AngularFirestore) {}
  getOffre() {
    return this.firestore.collection(
      'offres').snapshotChanges();
  }

}
