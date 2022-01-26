import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {GhButtonModule} from "@ctrl/ngx-github-buttons";
import {NgxBeautifyCursorModule} from "ngx-beautify-cursor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GhButtonModule,
    NgxBeautifyCursorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
