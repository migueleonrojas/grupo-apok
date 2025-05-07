import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Sweetalert2Service } from '../../../../shared/service/sweetalert2/sweetalert2.service';
import { ActivatedRoute } from '@angular/router';
import { NodesService } from '../../services/nodes.service';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NodeTree } from '../../../../core/models/node.interface';

@Component({
  selector: 'app-child-node',
  imports: [MatCardModule, MatChipsModule, AsyncPipe],
  templateUrl: './child-node.component.html',
  styleUrl: './child-node.component.scss',
})
export class ChildNodeComponent implements OnInit {
  private sweetalert2Service = inject(Sweetalert2Service);

  private route: ActivatedRoute = inject(ActivatedRoute);

  nodesService: NodesService = inject(NodesService);

  nodes$: Observable<NodeTree[]> = new Observable<NodeTree[]>();

  parentId: number = 0;

  async ngOnInit() {
    const params = await firstValueFrom(this.route.paramMap);
    this.parentId = Number(params.get('id'));
    this.nodes$ = this.nodesService.getChildNodes(this.parentId);
  }

  /* parentId$ = firstValueFrom(this.route.paramMap); */

  /* (nodes$ = this.nodesService.getChildNodes()); */

  async deleteNode() {
    if (
      !(await this.sweetalert2Service.confirmAction(
        '¿Desea eliminar este nodo?'
      ))
    )
      return;
  }
}
