import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../../../services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  imageFile!: string;

  constructor(private fb: FormBuilder, private eventService: EventService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      total_seats: [1, [Validators.required, Validators.min(1)]],
      sport_id: ['', Validators.required],
      location_id: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onSportIdChange(sportId: string) {
    this.eventForm.get('sport_id')?.setValue(sportId);
  }

  onLocationIdChange(locationId: string) {
    this.eventForm.get('location_id')?.setValue(locationId);
  }

  onSubmit() {
    const formData = new FormData();
    // Use optional chaining to safely get the value
    const nameControl = this.eventForm.get('name');
    const descriptionControl = this.eventForm.get('description');
    const totalSeatsControl = this.eventForm.get('total_seats');
    const sportIdControl = this.eventForm.get('sport_id');
    const locationIdControl = this.eventForm.get('location_id');
    const startTimeControl = this.eventForm.get('start_time');
    const endTimeControl = this.eventForm.get('end_time');
    const imageControl = this.eventForm.get('image');
    if (nameControl) formData.append('name', nameControl.value);
    if (descriptionControl)
      formData.append('description', descriptionControl.value);
    if (totalSeatsControl)
      formData.append('total_seats', totalSeatsControl.value);
    if (sportIdControl) formData.append('sport_id', sportIdControl.value);
    if (locationIdControl)
      formData.append('location_id', locationIdControl.value);
    if (startTimeControl) formData.append('start_time', startTimeControl.value);
    if (endTimeControl) formData.append('end_time', endTimeControl.value);
    if (imageControl) formData.append('image', imageControl.value);

    this.eventService.createEvent(formData).subscribe(
      (response) => {
        window.alert(response);
      },
      (error) => {
        window.alert(error);
      }
    );
  }
}
