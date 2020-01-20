import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { VilleService } from '../services/city.service';
import { QryOffreService } from '../services/offre.services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customers } from '../model/customers.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { QryQuotationsService } from '../services/quotation.services';
import { AffichService } from '../services/publicationDelay.service';
import 'firebase/firestore';
@AutoUnsubscribe()
@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss'],
})
export class OffreComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: variable-name
  quotation_form: FormGroup;
  errorMessage = '';
  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'Un email est obligtoire.' },
      { type: 'pattern', message: 'Entrer une  adresse valide.' }
    ],
    password: [
      { type: 'required', message: 'Un mot de passe est obligatoire.' },
      { type: 'minlength', message: 'Votre mot de passe doit contenir au moins 5 caractères.' }
    ]
  };
  enr: any;
  itemCollection: any;
  MyData: any;
  items: Observable<[any]>;
  enregistrement: any;
  [x: string]: any;
  list: Customers[];
  signupForm: FormGroup;
  ville: any;
  affichage: any;
  successMessage: string;
  constructor(private formBuilder: FormBuilder,
              private villeService: VilleService,
              private db: AngularFirestore,
              private affichService: AffichService,
              private qryOffreService: QryOffreService,
              private statusBar: StatusBar,
              private qryQuotationsService: QryQuotationsService,
              private toastController: ToastController,
              private router: Router) { }
  ngOnInit() {
    this.statusBar.overlaysWebView(false);
    this.initForm();
    this.getVille();
    this.getAffichageList();
  }
  getVille() {
    this.villeService.getVille().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(ville => {
      this.villeRef = ville;
      this.ville = ville;
      // console.log(this.ville);
    });
  }
  getAffichageList() {
    this.affichService.getAffichageList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(affichage => {
      this.afficsRef = affichage;
      this.affichage = affichage;
      // console.log(this.affichage);
    });
  }
  initForm() {
    // Validations patterns
    this.quotation_form = this.formBuilder.group({
      secteur: new FormControl('', Validators.compose([
        Validators.required
      ])),
      denomination: new FormControl('', Validators.compose([
        Validators.required
      ])),
      nom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      prix: new FormControl('', Validators.compose([
      ])),
      validate: new FormControl('', Validators.compose([
      ])),
      payed: new FormControl('', Validators.compose([
      ])),
      dci: new FormControl('', Validators.compose([
      ])),
      amm: new FormControl('', Validators.compose([
      ])),
      quantite: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      ville: new FormControl('', Validators.compose([
        Validators.required
      ])),
      affichage: new FormControl('', Validators.compose([
        Validators.required
      ])),
      type: new FormControl('', Validators.compose([
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gsm: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }
  tryRegister() {
    const data = this.quotation_form.value;
    this.qryOffreService.createOffre(data);
  }
  async quotationToast() {
    const toast = await this.toastController.create({
      message: 'Vous offre de quotation a été envoyée.Elle sera visible après validation et reception du paiement.',
      position: 'middle',
      duration: 6000
    });
    toast.present();
  }
  ngOnDestroy() {
  }
}
