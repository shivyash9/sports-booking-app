import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private bookingService: BookingService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      window.alert('Passwords do not match');
      return;
    }

    this.bookingService
      .signUp(this.email, this.username, this.password)
      .subscribe(
        (response) => {
          window.alert('Signup successful');
          // Redirect to login page or another route after successful signup
          this.router.navigate(['/login']);
        },
        (error) => {
          window.alert('Signup failed');
        }
      );
  }
}
