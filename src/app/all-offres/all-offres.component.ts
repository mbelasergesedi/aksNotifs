import { Component, OnInit } from '@angular/core';
import { AllOffService } from '../services/alloffre.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-all-offres',
  templateUrl: './all-offres.component.html',
  styleUrls: ['./all-offres.component.scss'],
})
export class AllOffresComponent implements OnInit {
  itemCollection: any;
  items: Observable<[any]>;
  inter: any;
  sizeCollect: any;
  constructor(private allOffreService: AllOffService,
              private db: AngularFirestore
              ) { }
  ngOnInit() {
    this.itemCollection = this.db.collection<any[]>('offres');
    this.items = this.itemCollection.valueChanges().subscribe((val: any) => {
      this.inter = val;
      this.sizeCollect = this.inter.size;
       // console.log( this.inter);
    });
  }
}
