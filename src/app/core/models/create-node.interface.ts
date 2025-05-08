import { Translation } from './translation.interface';

export interface CreateNode {
  id: number;
  parent: number | null;
  title: string;
  created_at: string;
  updated_at: string;
  translation: Translation[];
}
