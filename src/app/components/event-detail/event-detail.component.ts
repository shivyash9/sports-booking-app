import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  event: any;
  user_id: number | null = null;
  seats: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: BookingService,
    private cdr: ChangeDetectorRef
  ) {
    const authToken = localStorage.getItem('authToken');
    if (!!authToken) {
      this.user_id = parseInt(authToken);
    }
  }

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
    if (!this.user_id) {
      this.router.navigate(['/login']);
      return;
    }
    this.cdr.detectChanges();
    if (this.event.available_seats > 0 && !!this.user_id) {
      this.eventService
        .bookSlot(this.user_id, this.event.id, this.seats)
        .subscribe(
          (response) => {
            alert('Booking successful!: ' + response.message);
            window.location.reload();
          },
          (error) => {
            alert(error.error.error);
          }
        );
    } else {
      alert('No seats available.');
    }
  }
}
