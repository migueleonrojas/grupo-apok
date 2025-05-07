import { Routes } from '@angular/router';
import { ParentsNodeComponent } from './modules/tree/page/parent-nodes/parent-nodes.component';
import { ChildNodeComponent } from './modules/tree/page/child-node/child-node.component';

export const routes: Routes = [
  {
    path: '',
    component: ParentsNodeComponent,
  },
  {
    path: 'child-node/:id',
    component: ChildNodeComponent,
  },
];
