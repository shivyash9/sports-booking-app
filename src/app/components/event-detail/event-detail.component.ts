import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: BookingService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!isNaN(id)) {
      this.eventService.getEventById(id).subscribe((event) => {
        this.event = event;
      });
    } else {
      console.error('Invalid event ID');
    }
  }

  onBookNow() {
    const user_id = parseInt(localStorage.getItem('authToken') || '1');
    if (this.event.available_seats > 0) {
      this.eventService.bookSlot(user_id, this.event.id).subscribe(
        (response) => {
          alert('Booking successful!');
          window.location.reload();
        },
        (error) => {
          console.error('Booking failed', error);
          alert('Booking failed. Please try again later.');
        }
      );
    } else {
      alert('No seats available.');
    }
  }
}
