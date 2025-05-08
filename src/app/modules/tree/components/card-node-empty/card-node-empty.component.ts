import { Component, inject, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-card-node-empty',
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatButtonModule],
  templateUrl: './card-node-empty.component.html',
  styleUrl: './card-node-empty.component.scss',
})
export class CardNodeEmptyComponent {
  goBackEvent = output<boolean>();
  private location: Location = inject(Location);

  goBack() {
    this.goBackEvent.emit(true);
  }
}
