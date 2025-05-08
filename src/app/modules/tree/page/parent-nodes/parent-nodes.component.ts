import { Component, inject, OnInit } from '@angular/core';
import { NodesService } from '../../services/nodes.service';
import { AsyncPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { CardNodeParentComponent } from '../../components/card-node-parent/card-node-parent.component';

@Component({
  selector: 'app-parents-node',
  imports: [AsyncPipe, CardNodeParentComponent],
  templateUrl: './parent-nodes.component.html',
  styleUrl: './parent-nodes.component.scss',
})
export class ParentsNodeComponent {
  router: Router = inject(Router);

  nodesService: NodesService = inject(NodesService);

  parentNodes$ = this.nodesService.getParentNodes();

  goToChildNode(id: number) {
    this.router.navigate([`/child-node/${id}`]);
  }
}
