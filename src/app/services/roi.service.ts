import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Roi } from '../model/roi.model';
import { Tab1Page } from '../tab1/tab1.page';
@Injectable({
    providedIn: 'root'
})
export class RoiService {
    private dbPath = '/roi';
    roiRef: AngularFireList<Tab1Page>;


    constructor(private db: AngularFireDatabase) {
        this.roiRef = db.list(this.dbPath);
    }

    schools: Roi[] = [];
    schoolsSubject = new Subject<Roi[]>();
    getRoiList(): AngularFireList<Tab1Page> {
        return this.roiRef;
    }
}
