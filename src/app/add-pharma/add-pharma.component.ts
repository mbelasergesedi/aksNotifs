import { Component, OnInit } from '@angular/core';
import { VilleService } from '../services/city.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-add-pharma',
  templateUrl: './add-pharma.component.html',
  styleUrls: ['./add-pharma.component.scss'],
})
export class AddPharmaComponent implements OnInit {
  villeRef: any;
  ville: any;
  uniqueDeviceID: any;
  uuid: any;
  error: any;
  model: any;
  version: any;
  manufacturer: any;
  constructor(private villeService: VilleService) { }
  ngOnInit() { this.getVille(); }
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
}
