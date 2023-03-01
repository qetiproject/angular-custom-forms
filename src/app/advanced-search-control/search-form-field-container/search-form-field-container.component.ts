import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-form-field-container',
  templateUrl: './search-form-field-container.component.html',
  styleUrls: ['./search-form-field-container.component.css']
})
export class SearchFormFieldContainerComponent {
  formControl = new FormControl(
     { scope: '', query: ''  },
    // AdvancedSearchValidetor
  );

  constructor() {}

  ngOnInit(): void {}
}

function AdvancedSearchValidetor(control: FormControl) {
  return control.value.scope !== null && control.value.query !== ''
    ? null
    : {
        validateSearch: {
          valid: true,
        },
      };
}
