import { Component, inject, linkedSignal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Sweetalert2Service } from '../../../../shared/service/sweetalert2/sweetalert2.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
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

@Component({
  selector: 'app-child-node',
  imports: [
    MatCardModule,
    MatChipsModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
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

  locales$: Observable<Locale[]> = new Observable<Locale[]>();

  parentId: number = 0;

  locales = new FormControl<Locale[]>([]);

  async ngOnInit() {
    this.locales$ = this.localesService.getLocales();

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

  async changeLocale(event: MatSelectChange<Locale>, node: NodeTree) {
    const nodeTree = await lastValueFrom(this.nodes$);

    let getNodeTranslate = await firstValueFrom(
      this.nodesService.getNode(node.id, event.value.locale)
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

  async createNode() {
    if (this.locales.value?.length! < 1) {
      this.sweetalert2Service.showMessage(
        'Ocurrio algo',
        'Debe seleccionar al menos un lenguaje'
      );
      return;
    }

    const selectedLocales = this.locales.value!.map((locale) => locale.locale);

    const nodeCreated = await firstValueFrom(
      this.nodesService.createNode({
        locales: selectedLocales,
        parent: this.parentId,
      })
    );
    const nodeTree = await lastValueFrom(this.nodes$);

    this.sweetalert2Service.showMessage(
      'Nodo creado',
      `Se acaba de crear el node con el id:${nodeCreated.id}`
    );

    this.nodes$ = of([...nodeTree!]);
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

    const nodesAfterDeleted = removeByProperty(nodeTree!, 'id', nodeDeleted.id);

    this.nodes$ = of(nodesAfterDeleted);
  }

  goBack() {
    this.location.back();
  }
}
