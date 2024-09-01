import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pill-card',
  templateUrl: './pill-card.component.html',
  styleUrls: ['./pill-card.component.css'],
})
export class PillCardComponent implements OnInit {
  @Input() width = 54;
  @Input() customClasses = [];
  @Input() showStars = true;
  @Input() seats: number = -1;
  @Input() text: string = 'Book fast';

  ngOnInit(): void {
    if (this.seats != -1) {
      if (this.seats >= 100) {
        this.text = 'New';
      } else if (this.seats === 0) {
        this.text = 'Sold out';
      } else if (this.seats > 0 && this.seats < 100) {
        this.text = 'Book fast';
      }
    }
  }
}
