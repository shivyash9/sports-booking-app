import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-host',
  templateUrl: './event-host.component.html',
  styleUrls: ['./event-host.component.css'],
})
export class EventHostComponent {
  user_id: number | null = null;
  authToken: string | null = null;

  constructor(private router: Router) {
    const userID = localStorage.getItem('user_id');
    this.authToken = localStorage.getItem('authToken');
    if (!!userID) {
      this.user_id = parseInt(userID);
    }
  }

  ngOnInit(): void {
    if (!this.user_id || !this.authToken) {
      this.router.navigate(['/login']);
    }
  }
}
