import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';
import { AppRoutingModule } from './app-routing.module';
import { ContactsComponent } from './contacts/contacts.component';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './core/services/auth.interceptor';
import { AppComponent } from './core/views/app.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HotToastModule.forRoot(),
    MatTableModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  declarations: [ContactsComponent],
})
export class AppModule {}
