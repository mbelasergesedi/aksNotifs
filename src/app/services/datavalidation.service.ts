import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tab2Page } from '../tab2/tab2.page';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface DeviceData {
    lat: string;
    lng: string;
    uuid: string;
  }
@Injectable()
export class QryValidationService {
    lat: string;
    lng: string;
    uuid: string;
    private dbPath = '/DataValidation';
    customerRef: AngularFireList<Tab2Page> = null;
    constructor(private firestore: AngularFirestore) { }
    ValidationCreate(data)  {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection('DataValidation')
                .add(data)
                .then(res => { }, err => reject(err));
        });
    }
}
