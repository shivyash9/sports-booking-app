import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SportService } from '../../../../services/sport.service';

@Component({
  selector: 'app-sport-select',
  templateUrl: './sport-select.component.html',
  styleUrls: ['./sport-select.component.css'],
})
export class SportSelectComponent implements OnInit {
  @Input()
  control!: FormControl;
  sports: any[] = [];
  showNewSportForm = false;
  newSport = { name: '', description: '', image: '' };
  @Output() selectedSportId = new EventEmitter<string>();

  constructor(private sportService: SportService) {}

  ngOnInit(): void {
    this.sportService.getSports().subscribe((sports) => {
      this.sports = sports;
    });
  }

  onSportChange(event: any) {
    if (event.target.value === 'new') {
      this.showNewSportForm = true;
    } else {
      this.showNewSportForm = false;
    }
    this.selectedSportId.emit(event.target.value);
  }

  createSport() {
    const formData = new FormData();
    formData.append('name', this.newSport.name);
    formData.append('description', this.newSport.description);
    formData.append('image', this.newSport.image);

    this.sportService.createSport(formData).subscribe((sport) => {
      this.sports.push(sport);
      this.control.setValue(sport.id);
      this.showNewSportForm = false;
      this.selectedSportId.emit(sport.id);
    });
    this.showNewSportForm = false;
  }
}
