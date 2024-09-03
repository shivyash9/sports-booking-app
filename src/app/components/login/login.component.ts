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
        const username = response.user.username;
        const token = response.token;
        const userid = response.user.id;
        this.bookingService.saveCredentials(token, userid, username);
        window.location.reload();
      },
      (error) => {
        window.alert('Login failed');
      }
    );
  }
}
