import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  schedule$!: Observable<any[]>;
  user_id: number | null = null;
  constructor(private bookingService: BookingService, private router: Router) {
    const authToken = localStorage.getItem('authToken');
    if (!!authToken) {
      this.user_id = parseInt(authToken);
    }
  }

  ngOnInit(): void {
    if (this.user_id) {
      this.schedule$ = this.bookingService.getUserEvents(this.user_id);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
