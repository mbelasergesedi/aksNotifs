import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AccountComponent } from '../tab3/account/account.component';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
@Injectable()
export class QryOffreService {
    code: string;
    mycode: string;
    private dbPath = '/offres';
    customerRef: AngularFireList<AccountComponent> = null;
    constructor(private firestore: AngularFirestore) { }
    form = new FormGroup({
        customerName: new FormControl(''),
        orderNumber: new FormControl(''),
        coffeeOrder: new FormControl(''),
        completed: new FormControl(false)
    });

    createOffre(data) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection('offres')
                .add({ data, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
                .then(res => { }, err => reject(err));
        });
    }

    updateOffre(data) {
        return this.firestore
            .collection('offres')
            .doc(data.payload.doc.id)
            .set({ completed: true }, { merge: true });
    }

    getOffre() {
        return this.firestore.collection(
            'offres').snapshotChanges();
    }

    deleteOffre(data) {
        return this.firestore
            .collection('offres')
            .doc(data.payload.doc.id)
            .delete();
    }
}
