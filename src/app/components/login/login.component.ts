import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private bookingService: BookingService, private router: Router) {}

  onSubmit() {
    this.bookingService.logIn(this.email, this.password).subscribe(
      (response) => {
        const { password_digest } = response;
        // if (password_digest) {
        this.bookingService.saveCredentials(password_digest);
        window.location.reload();
        // }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
