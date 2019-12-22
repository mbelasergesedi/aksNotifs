import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
@AutoUnsubscribe()
@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss'],
})
export class InformationsComponent implements OnInit, OnDestroy {
  title = 'angular-http-spinner-loader';
  code: Subscription;
  [x: string]: any;
  itemValue = '';
  notifs: Observable<any[]>;
  itemCollection: any;
  items: Observable<[any]>;
  constructor(private db: AngularFirestore, private route: ActivatedRoute){ }
  ngOnInit() {
    const queryParamMap = this.route.snapshot['queryParamMap'];
    this.itemCollection = this.db.collection<any[]>('notifications', ref => ref.where('categorie', '==',
      'alertes'));
    this.notifs = this.db.collection('notifications',
      ref => ref.where('categorie', '==', queryParamMap['params'].categorie)).valueChanges();
  }
  ngOnDestroy() {
    // We'll throw an error if it doesn't
  }
}
