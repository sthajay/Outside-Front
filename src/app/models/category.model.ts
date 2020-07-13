import { Product } from './product.model';

export interface Category {
  id: string;
  name:string;
  product: Product[];
}
