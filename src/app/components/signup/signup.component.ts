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
      console.error('Passwords do not match');
      return;
    }

    this.bookingService
      .signUp(this.username, this.email, this.password)
      .subscribe(
        (response) => {
          console.log('Signup successful', response);
          // Redirect to login page or another route after successful signup
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Signup failed', error);
        }
      );
  }
}
