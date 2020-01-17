import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../../services/authentication.service';
import { VilleService } from '../../services/city.service';
import { QryCustomerService } from '../../services/customers.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customers } from '../../model/customers.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  account_form: FormGroup;
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
  gsm: any;
  uuid: any;
  iddevice: any;
  model: any;
  platform: any;
  manufacturer: any;
  version: any;
  itemCollection: any;
  MyData: any;
  items: Observable<[any]>;
  enregistrement: any;
  [x: string]: any;
  list: Customers[];
  signupForm: FormGroup;
  ville: any;
  mypost;
  successMessage: string;
  constructor(private formBuilder: FormBuilder,
              private authenticateService: AuthenticateService,
              private villeService: VilleService,
              private geolocation: Geolocation,
              private uniqueDeviceID: UniqueDeviceID,
              private db: AngularFirestore,
              private qryCustomerService: QryCustomerService,
              private toastController: ToastController) {
  }
  async logInToast() {
    await firebase.auth().signOut();
    const toast = await this.toastController.create({
      position: 'middle',
      message: 'Vous êtes deconnecté.',
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
    this.initForm();
    this.getVille();
    this.mypost();
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
    });
  }
  initForm() {
    // Validations patterns
    // Validations patterns
    this.account_form = this.formBuilder.group({
      civilite: new FormControl('', Validators.compose([
        Validators.required
      ])),
      nom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      profession: new FormControl('', Validators.compose([
        Validators.required
      ])),
      ville: new FormControl('', Validators.compose([
        Validators.required
      ])),
      structure: new FormControl('', Validators.compose([
        Validators.required
      ])),
      device: [],
      version: [],
      model: [],
      manufacturer: [],
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      validate: new FormControl('', Validators.compose([
        Validators.required
      ])),
      gsm: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])),
    });
  }
  tryRegister() {
    const data = this.account_form.value;
    // 1. On cherche si l'email de l'utilisateur est déjà présent dans la DB;
    this.itemCollection = this.db.collection<any[]>('customers', ref => ref.where('data.email', '==',
      this.account_form.get('email').value));
    this.items = this.itemCollection.valueChanges().subscribe(async (val: any) => {
      this.enregistrement = val;
      // console.log(this.enregistrement);
      // console.log(this.enregistrement.length);
      // 2. S'il n'est pas présent, on l'inscrit dans la DB et dans système d'authentification;
      if (this.enregistrement && this.enregistrement.constructor === Array && this.enregistrement.length === 0) {
        this.uniqueDeviceID.get()
          .then((uuid: any) => this.uuid = uuid)
          .catch((error: any) => this.error = error);

        this.uniqueDeviceID.get()
          .then((model: any) => this.model = model)
          .catch((error: any) => this.error = error);

        this.uniqueDeviceID.get()
          .then((version: any) => this.version = version)
          .catch((error: any) => this.error = error);

        this.uniqueDeviceID.get()
          .then((manufacturer: any) => this.manufacturer = manufacturer)
          .catch((error: any) => this.error = error);

        this.qryCustomerService.createCustomer({
          data, createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        this.authenticateService.registerUser(this.account_form.get('email').value, this.account_form.get('password').value)
          .then(() => {
            this.errorMessage = '';
            this.successMessage = 'Votre compte a été crée.';
          }, err => {
            this.errorMessage = err.message;
            this.successMessage = '';
          });
        // 3. Sinon on le previent qu'il est déjà présent dans la DB;
        // } //else {
        // console.log('Utilisateur déjà présent');
        const toast = this.toastController.create({
          message: 'Félicitations ! Votre compte a été crée. Vos données seront visibles après validation.',
          position: 'middle',
          duration: 2000
        });
        (await toast).present();
        // }
      }
      // tslint:disable-next-line: max-line-length
      if (this.enregistrement && this.enregistrement.constructor === Array && this.enregistrement.length !== 0) {
        const toast = this.toastController.create({
          message: 'Désolé ce compte existe déjà et ne peut être dupliqué.',
          position: 'middle',
          duration: 2000
        });
        (await toast).present();
      }
    });
  }
}
