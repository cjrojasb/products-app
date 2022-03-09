import { ProductState } from '@interfaces/Product.state';
import { ActionReducerMap } from '@ngrx/store';
import { productsReducer } from './reducers/products.reducer';

export interface AppState {
  products: ProductState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  products: productsReducer,
};
