import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ToCreateNode } from '../../../core/models/to-create-node.interface';
import { NodeTree } from '../../../core/models/node.interface';
import { GetNode } from '../../../core/models/get-node.interface';

@Injectable({
  providedIn: 'root',
})
export class NodesService {
  private httpClient = inject(HttpClient);

  deleteNode(idNode: number): Observable<NodeTree> {
    return this.httpClient.delete<NodeTree>(
      `${environment.url}/node/${idNode}`
    );
  }

  createNode(toCreateNode: ToCreateNode): Observable<any> {
    return this.httpClient.post(`${environment.url}`, toCreateNode);
  }

  getNode(idNode: number, locale: String): Observable<GetNode> {
    return this.httpClient.get<GetNode>(
      `${environment.url}/node/${idNode}?locale=${locale}`
    );
  }

  getParentNodes(): Observable<NodeTree[]> {
    return this.httpClient.get<any[]>(`${environment.url}/nodes`);
  }

  getChildNodes(idParent: number): Observable<NodeTree[] | undefined> {
    return this.httpClient
      .get<NodeTree[] | undefined>(
        `${environment.url}/nodes?parent=${idParent}`
      )
      .pipe(
        startWith([]),
        map((res) => res ?? []),
        catchError(() => of(undefined))
      );
  }
}
