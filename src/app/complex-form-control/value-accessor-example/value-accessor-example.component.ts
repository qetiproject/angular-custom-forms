import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-value-accessor-example',
  templateUrl: './value-accessor-example.component.html',
  styleUrls: ['./value-accessor-example.component.css']
})
export class ValueAccessorExampleComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      itemName: new FormControl(),
      isLocked: new FormControl({value: false, disabled: true}),
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
