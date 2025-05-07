import { Translation } from './translation.interface';

export interface GetNode {
  id: number;
  parent: number | null;
  title: string;
  created_at: null;
  updated_at: null;
  translation: Translation[];
}
