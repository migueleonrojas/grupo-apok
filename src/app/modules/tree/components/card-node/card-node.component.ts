import { AsyncPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NodeTree } from '../../../../core/models/node.interface';
import { Locale } from '../../../../core/models/locales.interface';

@Component({
  selector: 'app-card-node',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './card-node.component.html',
  styleUrl: './card-node.component.scss',
})
export class CardNodeComponent {
  nodeInput = input.required<NodeTree>();
  localesInput = input.required<Locale[]>();

  childId = output<number>();
  parentId = output<number>();
  currentId = output<number>();
  getChangeLocal = output<{
    locale: Locale;
    node: NodeTree;
  }>();

  emitCurrentId(id: number) {
    this.currentId.emit(id);
  }
  emitParentId(id: number) {
    this.parentId.emit(id);
  }
  emitChildId(id: number) {
    this.childId.emit(id);
  }

  changeLocale(event: MatSelectChange<Locale>, node: NodeTree) {
    this.getChangeLocal.emit({
      locale: event.value,
      node: node,
    });
  }
}
