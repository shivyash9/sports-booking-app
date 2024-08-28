import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  filterName: string = '';
  filterPincode: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.subscription.add(
      this.bookingService.getEvents().subscribe(
        (events: any[]) => {
          this.events = events;
          this.filteredEvents = this.events;
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
      return nameMatch && pincodeMatch;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
