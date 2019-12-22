import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-infosdetails',
  templateUrl: './infosdetails.component.html',
  styleUrls: ['./infosdetails.component.scss'],
})
export class InfosdetailsComponent implements OnInit {
  itemCollection: any;
  items: Observable<[any]>;
  enregistrement: any;
  categorie: string;
  key: string;
  notifs: any;
  platform: any;
  toastCtrl: any;
  url: string;
  image: string;
  message: string;
  returnlinks: any;
  constructor(private db: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    const queryParamMap = this.route.snapshot['queryParamMap'];
    // console.log(queryParamMap['params'].key);
    this.itemCollection = this.db.collection<any[]>('notifications', ref => ref.where('key', '==',
      queryParamMap['params'].key));
    this.notifs = this.db.collection('notifications',
      ref => ref.where('key', '==', queryParamMap['params'].key)).valueChanges();
  }
}
