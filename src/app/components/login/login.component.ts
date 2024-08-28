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
        const id = response.user.id;
        const username = response.user.username;
        this.bookingService.saveCredentials(id, username);
        window.location.reload();
      },
      (error) => {
        window.alert('Login failed');
      }
    );
  }
}
