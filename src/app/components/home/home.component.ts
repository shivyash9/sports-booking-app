import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  events: any[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.subscription.add(
      this.bookingService.getEvents().subscribe(
        (events: any[]) => {
          this.events = events;
        },
        (error: any) => {
          console.error('Error fetching events', error);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
