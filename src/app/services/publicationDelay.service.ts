import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Affichage } from '../model/affichage.model';
@Injectable({
    providedIn: 'root'
})
export class AffichService {
    private dbPath = '/prixaffichage';
    afficsRef: AngularFireList<Affichage> = null;
    constructor(private db: AngularFireDatabase) {
        this.afficsRef = db.list(this.dbPath);
    }
    getAffichageList(): AngularFireList<Affichage> {
        return this.afficsRef;
    }
}

