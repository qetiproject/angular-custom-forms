import { Component, OnInit } from '@angular/core';
import { NgControl, AbstractControlDirective } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';

export interface FormFieldValue {
  query: string;
  scope: string;
}

@Component({
  selector: 'app-custom-form-field-control',
  templateUrl: './custom-form-field-control.component.html',
  styleUrls: ['./custom-form-field-control.component.css'],
  providers:[
    {
      provide: MatFormFieldControl,
      useExisting: CustomFormFieldControlComponent
    }
  ]
})
export class CustomFormFieldControlComponent implements OnInit, MatFormFieldControl<FormFieldValue>{
  value!: FormFieldValue | null;
  stateChanges: Observable<void> = new Subject();
  id!: string;
  placeholder!: string;
  ngControl!: NgControl | AbstractControlDirective | null;
  focused!: boolean;
  empty!: boolean;
  shouldLabelFloat!: boolean;
  required!: boolean;
  disabled!: boolean;
  errorState!: boolean;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  
  setDescribedByIds(ids: string[]): void {
  }
  onContainerClick(event: MouseEvent): void {
  }
  
  ngOnInit(): void {
  }

}
