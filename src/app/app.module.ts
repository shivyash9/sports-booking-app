import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { BookingService } from './services/booking.service';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PillCardComponent } from './components/pill-card/pill-card.component';
import { AuthInterceptor } from '../app/auth.interceptor';
import { EventHostComponent } from './components/event-host/event-host.component';
import { EventFormComponent } from './components/event-host/components/event-form/event-form.component';
import { SportSelectComponent } from './components/event-host/components/sport-select/sport-select.component';
import { LocationSelectComponent } from './components/event-host/components/location-select/location-select.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScheduleComponent,
    HeaderComponent,
    EventDetailComponent,
    LoginComponent,
    SignupComponent,
    PillCardComponent,
    EventHostComponent,
    EventFormComponent,
    SportSelectComponent,
    LocationSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
