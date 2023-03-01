import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-form-field-container',
  templateUrl: './search-form-field-container.component.html',
  styleUrls: ['./search-form-field-container.component.css']
})
export class SearchFormFieldContainerComponent {
  formControl = new FormControl({scope: '', query: ''})
}
