import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  user_name = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('user');
    this.user_name = localStorage.getItem('user') || '';
    // if (!!this.isLoggedIn) {
    //   this.router.navigate(['/']);
    // }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logoClicked() {
    window.location.reload();
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    window.location.reload();

    // this.router.navigate(['/']);
  }
}
