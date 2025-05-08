import { Component, input, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NodeTree } from '../../../../core/models/node.interface';

@Component({
  selector: 'app-card-node-parent',
  imports: [MatListModule, MatCardModule, MatChipsModule],
  templateUrl: './card-node-parent.component.html',
  styleUrl: './card-node-parent.component.scss',
})
export class CardNodeParentComponent {
  parentNode = input.required<NodeTree>();

  parentId = output<number>();

  emitParentId(id: number) {
    this.parentId.emit(id);
  }
}
