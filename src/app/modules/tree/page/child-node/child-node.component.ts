import { Component, inject, OnInit } from '@angular/core';
import { Sweetalert2Service } from '../../../../shared/service/sweetalert2/sweetalert2.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NodesService } from '../../services/nodes.service';
import { firstValueFrom, lastValueFrom, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NodeTree } from '../../../../core/models/node.interface';
import { Location } from '@angular/common';
import { LocalesService } from '../../services/locales.service';
import { Locale } from '../../../../core/models/locales.interface';
import { GetNode } from '../../../../core/models/get-node.interface';
import {
  removeByProperty,
  updateByProperty,
} from '../../../../shared/utils/arrays';
import { CardNodeEmptyComponent } from '../../components/card-node-empty/card-node-empty.component';
import { CardNodeCreateComponent } from '../../components/card-node-create/card-node-create.component';
import { CardNodeComponent } from '../../components/card-node/card-node.component';

@Component({
  selector: 'app-child-node',
  imports: [
    AsyncPipe,
    CardNodeEmptyComponent,
    CardNodeCreateComponent,
    CardNodeComponent,
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

  localesService: LocalesService = inject(LocalesService);

  nodes$: Observable<NodeTree[] | undefined> = new Observable<
    NodeTree[] | undefined
  >();

  locales: Locale[] = [];

  parentId: number = 0;

  async ngOnInit() {
    this.locales = await firstValueFrom(this.localesService.getLocales());

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

  async getCurrentNode(id: number, locale: string): Promise<GetNode> {
    return await firstValueFrom(this.nodesService.getNode(id, locale));
  }

  async changeLocale(locale: Locale, node: NodeTree) {
    const nodeTree = await lastValueFrom(this.nodes$);

    let getNodeTranslate = await firstValueFrom(
      this.nodesService.getNode(node.id, locale.locale)
    );

    if (getNodeTranslate.translation.length === 0) {
      this.sweetalert2Service.showMessage(
        'Hubo un inconveniente',
        'El idioma es el mismo o no existe.'
      );
      return;
    }

    const updatedNodes = updateByProperty(nodeTree!, 'id', node.id, {
      title: getNodeTranslate.translation[0].title,
    });

    this.nodes$ = of(updatedNodes);
  }

  async createNode(locales: Locale[]) {
    if (locales.length! < 1) {
      this.sweetalert2Service.showMessage(
        'Ocurrio algo',
        'Debe seleccionar al menos un lenguaje'
      );
      return;
    }

    const selectedLocales = locales.map((locale) => locale.locale);
    const nodeTree = await lastValueFrom(this.nodes$);

    const nodeCreated = await firstValueFrom(
      this.nodesService.createNode({
        locales: selectedLocales,
        parent: this.parentId,
      })
    );

    this.sweetalert2Service.showMessage(
      'Nodo creado',
      `Se acaba de crear el node con el id:${nodeCreated.id}`
    );

    this.nodes$ = of([...nodeTree!, nodeCreated]);
  }

  async deleteNode(id: number) {
    if (
      !(await this.sweetalert2Service.confirmAction(
        '¿Desea eliminar este nodo?'
      ))
    )
      return;

    let childsCurrentNode = await lastValueFrom(
      this.nodesService.getChildNodes(id)
    );

    if (childsCurrentNode !== undefined) {
      this.sweetalert2Service.showMessage(
        'Hubo un inconveniente',
        'No se puede eliminar el node porque tiene nodos hijos.'
      );
      return;
    }
    let nodeDeleted = await firstValueFrom(this.nodesService.deleteNode(id));

    const nodeTree = await lastValueFrom(this.nodes$);

    if (childsCurrentNode === undefined) {
      this.ngOnInit();

      return;
    }

    const nodesAfterDeleted = removeByProperty(nodeTree!, 'id', nodeDeleted.id);

    this.ngOnInit();
  }

  goBack() {
    this.location.back();
  }
}
