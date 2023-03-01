import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { NgControl, ControlValueAccessor, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Subject } from 'rxjs';

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
export class CustomFormFieldControlComponent implements OnInit, MatFormFieldControl<FormFieldValue>, OnDestroy, ControlValueAccessor {
  
  static nextId = 0;
  
  @ViewChild(MatInput, { read: ElementRef, static: true })
  input!: ElementRef;

  @Input()
  set value(value: any) {
    this.form.patchValue(value);
    this.stateChanges.next();
  }

  get value() {
    return this.form.value;
  }

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

  focused!: boolean;

  get empty(): boolean {
    return !this.value.query && !this.value.scope
  }

  @HostBinding('class.floated')

  get shouldLabelFloat(): boolean {
    // return this.focused || this.empty;
    return true;
  }

  @Input()
  required!: boolean;
  
  @Input()
  disabled!: boolean;


  errorState = true;
  
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  
  onChange!: (value: FormFieldValue) => void;
  onTouche!: () => void;

  form!: FormGroup;

  constructor(
    private focusMonitor: FocusMonitor,
    @Optional() @Self() public ngControl: NgControl,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      scope: new FormControl(''),
      query: new FormControl('')
    })
    if(this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: FormFieldValue): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouche = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.form.disable();
    this.stateChanges.next();
  }

  @HostBinding('attr.aria-describedby') describedBy='';

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(): void {
    this.focusMonitor.focusVia(this.input, 'program');
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
