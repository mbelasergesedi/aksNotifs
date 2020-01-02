import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tab2Page } from '../tab2/tab2.page';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
export interface DeviceData {
    latitude: string;
    longitude: string;
    uuid: string;
    device: string;
  }
@Injectable()
export class QryValidationService {
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
