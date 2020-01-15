import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TextSearchService, User } from '../../services/textsearch.service';
@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent implements OnInit {
  searchedTerm;
  title = 'angular-http-spinner-loader';
  form: FormGroup;
  med: any;
  results;
  medterm: any;
  occurence: any;
  resultsTotal: any;
  constructor(
    private formBuilder: FormBuilder,
    private textSearchService: TextSearchService) { }
    public votretext: Observable<User>;
  ngOnInit() {
    this.form = this.formBuilder.group({
      votretext: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  submit() {
    if (this.form.valid) {
      this.searchedTerm = (this.form.value.votretext);
      this.med = this.textSearchService.getCode(this.searchedTerm).subscribe((data) => {
        this.results = data;
        this.resultsTotal = this.results.total;
      });
    }
  }
}
