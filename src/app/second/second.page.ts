import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {

  constructor(private route: ActivatedRoute) { this.price = this.route.snapshot.params['price'];}
  price: any = '';
  ngOnInit() {
  }

}
