import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComplexFormControlModule } from './complex-form-control/complex-form-control.module';
import { PatternsExampleModule } from './patterns-example/patterns.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    ComplexFormControlModule,
    PatternsExampleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
