import { Component, input, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Locale } from '../../../../core/models/locales.interface';

@Component({
  selector: 'app-card-node-create',
  imports: [
    MatCardModule,
    MatChipsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './card-node-create.component.html',
  styleUrl: './card-node-create.component.scss',
})
export class CardNodeCreateComponent {
  localesSelected = new FormControl<Locale[]>([]);
  locales = input.required<Locale[]>();
  selectedLocales = output<Locale[]>();

  emitLocales() {
    this.selectedLocales.emit(this.localesSelected.value!);
  }
}
