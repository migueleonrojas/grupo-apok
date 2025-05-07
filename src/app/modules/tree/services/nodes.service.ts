import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ToCreateNode } from '../../../core/models/to-create-node.interface';
import { NodeTree } from '../../../core/models/node.interface';

@Injectable({
  providedIn: 'root',
})
export class NodesService {
  private httpClient = inject(HttpClient);

  deleteNode(idNode: number): Observable<any> {
    return this.httpClient.delete(`${environment.url}/node/${idNode}`);
  }

  createNode(toCreateNode: ToCreateNode): Observable<any> {
    return this.httpClient.post(`${environment.url}`, toCreateNode);
  }

  getNode(idNode: number, locale: String): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.url}/${idNode}/?locale=${locale}`
    );
  }

  getParentNodes(): Observable<NodeTree[]> {
    return this.httpClient.get<any[]>(`${environment.url}/nodes`);
  }

  getChildNodes(idParent: number): Observable<NodeTree[]> {
    return this.httpClient.get<NodeTree[]>(
      `${environment.url}/nodes?parent=${idParent}`
    );
  }
}
