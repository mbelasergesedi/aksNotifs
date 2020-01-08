import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddPharmaComponent } from '../add-pharma/add-pharma.component';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
@Injectable()
export class OfficineService {
    private dbPath = '/officine';
    customerRef: AngularFireList<AddPharmaComponent> = null;
    constructor(private firestore: AngularFirestore) { }
    OfficineCreate(data) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection('officine')
                .add({ data, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
                .then(res => { }, err => reject(err));
        });
    }
}
