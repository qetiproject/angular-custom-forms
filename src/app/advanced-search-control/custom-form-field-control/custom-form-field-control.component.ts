import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgControl, AbstractControlDirective } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
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
export class CustomFormFieldControlComponent implements OnInit, MatFormFieldControl<FormFieldValue>, OnDestroy{
  static nextId = 0;
  
  @ViewChild(MatInput, { read: ElementRef, static: true })
  input!: ElementRef;

  @Input()
  set value(value: any) {
    this._value = value;
    this.stateChanges.next();
  }

  get value() {
    return this._value;
  }

  private _value!: FormFieldValue;

  stateChanges = new Subject<void>();
  
  @HostBinding()
  id = `custom-form-field-id-${CustomFormFieldControlComponent.nextId++}`;

  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder() {
    return this._placeholder;
  }
  private _placeholder!: string;

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
  

  constructor(
    private focusMonitor: FocusMonitor
  ) {}

 

  setDescribedByIds(ids: string[]): void {
  }

  onContainerClick(event: MouseEvent): void {
  }
  
  ngOnInit(): void {
    this.focusMonitor.monitor(this.input)
      .subscribe((focused) => {
        this.focused = !!focused;
        this.stateChanges.next();
      });
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete();
  }

}
