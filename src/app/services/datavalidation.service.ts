import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tab2Page } from '../tab2/tab2.page';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
@Injectable()
export class QryValidationService {
    private dbPath = '/DataValidation';
    customerRef: AngularFireList<Tab2Page> = null;
    constructor(private firestore: AngularFirestore) { }
    ValidationCreate(data)  {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection('DataValidation')
                .add({data, createdAt: firebase.firestore.FieldValue.serverTimestamp()})
                .then(res => { }, err => reject(err));
        });
    }
}

