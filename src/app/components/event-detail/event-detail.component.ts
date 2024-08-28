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
    const id = Number(idParam); // Convert idParam to a number

    if (!isNaN(id)) {
      this.eventService.getEventById(id).subscribe((event) => {
        this.event = event;
      });
    } else {
      // Handle invalid ID case
      console.error('Invalid event ID');
    }
  }
}
