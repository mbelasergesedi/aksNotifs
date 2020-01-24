import { Component, OnInit } from '@angular/core';
import { AuthsService } from '../../services/authServices';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  constructor(
    public authsService: AuthsService
  ) { }

  ngOnInit() { }

}
