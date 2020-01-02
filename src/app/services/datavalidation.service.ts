import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tab2Page } from '../tab2/tab2.page';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable()
export class QryValidationService {
    code: string;
    mycode: string;
    private dbPath = '/DataValidation';
    customerRef: AngularFireList<Tab2Page> = null;
    constructor(private firestore: AngularFirestore) { }
    form = new FormGroup({
        customerName: new FormControl(''),
        orderNumber: new FormControl(''),
        coffeeOrder: new FormControl(''),
        completed: new FormControl(false)
    });
    ValidationCreate(data) {
        return new Promise<any>((resolve, reject) => {
            this.firestore
                .collection('DataValidation')
                .add(data)
                .then(res => { }, err => reject(err));
        });
    }
}
