import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
  }

}
