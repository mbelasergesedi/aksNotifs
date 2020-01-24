import { Component, OnInit } from '@angular/core';
import { AuthsService } from '../../services/authServices';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public authsService: AuthsService
  ) { }

  ngOnInit() {
  }

}
