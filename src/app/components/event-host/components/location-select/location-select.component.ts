import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocationService } from '../../../../services/location.service';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.css'],
})
export class LocationSelectComponent implements OnInit {
  @Input()
  control!: FormControl;
  locations: any[] = [];
  showNewLocationForm = false;
  newLocation = { name: '', address: '', pincode: '', iframe: '' };
  @Output() selectedLocationId = new EventEmitter<string>();

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.locations = locations;
    });
  }

  onLocationChange(event: any) {
    if (event.target.value === 'new') {
      this.showNewLocationForm = true;
    } else {
      this.showNewLocationForm = false;
    }
    this.selectedLocationId.emit(event.target.value);
  }

  createLocation() {
    const locationData = {
      name: this.newLocation.name,
      address: this.newLocation.address,
      pincode: this.newLocation.pincode,
      iframe: this.newLocation.iframe,
    };

    this.locationService.createLocation(locationData).subscribe((location) => {
      this.locations.push(location);
      this.control.setValue(location.id);
    });
    this.showNewLocationForm = false;
  }
}
