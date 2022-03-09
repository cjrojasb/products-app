import { Product } from './Product';

export interface ProductState {
  loading: boolean;
  products: ReadonlyArray<Product>;
}
