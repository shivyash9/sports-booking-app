import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  events: any[] = [];
  filteredEvents: any[] = [];
  hostedEvents: any[] = [];
  filterName: string = '';
  filterPincode: string = '';
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
          this.hostedEvents = this.events.filter(
            (event) => event.event_visibility === 'private'
          );
          this.filteredEvents = this.events.filter(
            (event) => event.event_visibility === 'public'
          );
        },
        (error: any) => {
          console.error('Error fetching events', error);
        }
      )
    );
  }

  filterEvents() {
    this.filteredEvents = this.events.filter((event) => {
      const nameMatch = this.filterName
        ? event.name.toLowerCase().includes(this.filterName.toLowerCase())
        : true;
      const pincodeMatch = this.filterPincode
        ? event.location.pincode.includes(this.filterPincode)
        : true;
      return event.event_visibility === 'public' && nameMatch && pincodeMatch;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
