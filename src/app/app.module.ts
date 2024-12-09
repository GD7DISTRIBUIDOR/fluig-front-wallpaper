import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpClientModule } from "@angular/common/http"
import { APP_BASE_HREF, CommonModule } from '@angular/common';

import { APP_CONFIG } from './app.config';

import { WallpaperFormComponent } from './modules/wallpaper-form/wallpaper-form.component';
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'

@NgModule({
  declarations: [
    AppComponent,
    WallpaperFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ButtonModule,
    DialogModule,
    FileUploadModule,
    ToastModule
  ],
  providers: [
    MessageService,
    {provide: APP_BASE_HREF, useValue: APP_CONFIG.APP_BASE}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
