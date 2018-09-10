import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatFormFieldModule,
  MatTabsModule,
  MatIconModule, MatInputModule, MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatCardModule, MatAutocompleteModule,
    MatButtonModule, MatFormFieldModule,
    MatIconModule, MatInputModule,
    // FlexLayoutModule,
    MatSelectModule, MatTabsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
