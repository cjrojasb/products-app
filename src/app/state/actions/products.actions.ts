import { createAction, props } from '@ngrx/store';
import { Product } from '@interfaces/Product';
import { ACTION_CONSTANTS } from '@state/constants/constants';

export const loadProducts = createAction(
  ACTION_CONSTANTS.LOAD_PRODUCTS
);

export const loadedProducts = createAction(
  ACTION_CONSTANTS.LOADED_PRODUCTS,
  props<{ products: ReadonlyArray<Product> }>()
);

export const addProduct = createAction(
  ACTION_CONSTANTS.ADD_PRODUCT,
  props<{ product: Product }>()
);

export const editProduct = createAction(
  ACTION_CONSTANTS.EDIT_PRODUCT,
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  ACTION_CONSTANTS.DELETE_PRODUCT,
  props<{ id: number }>()
);
