import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Sweetalert2Service } from '../../../../shared/service/sweetalert2/sweetalert2.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { NodesService } from '../../services/nodes.service';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NodeTree } from '../../../../core/models/node.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-child-node',
  imports: [
    MatCardModule,
    MatChipsModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './child-node.component.html',
  styleUrl: './child-node.component.scss',
})
export class ChildNodeComponent implements OnInit {
  private sweetalert2Service = inject(Sweetalert2Service);

  private route: ActivatedRoute = inject(ActivatedRoute);

  private router: Router = inject(Router);

  private location: Location = inject(Location);

  nodesService: NodesService = inject(NodesService);

  nodes$: Observable<NodeTree[] | undefined> = new Observable<
    NodeTree[] | undefined
  >();

  parentId: number = 0;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.parentId = Number(params.get('id'));
      this.nodes$ = this.nodesService.getChildNodes(this.parentId);
    });
  }

  goToChildNode(id: number) {
    this.router.navigate([`/child-node/${id}`]);
  }

  async goToParentNode(id: number) {
    let currentNode = await this.getCurrentNode(id, 'es_ES');

    if (currentNode.parent === null) {
      this.router.navigate([``]);
    } else {
      this.router.navigate([`/child-node/${currentNode.parent}`]);
    }
  }

  async getCurrentNode(id: number, locale: string): Promise<NodeTree> {
    return await firstValueFrom(this.nodesService.getNode(id, locale));
  }

  async deleteNode() {
    if (
      !(await this.sweetalert2Service.confirmAction(
        '¿Desea eliminar este nodo?'
      ))
    )
      return;
  }

  goBack() {
    this.location.back();
  }
}
