import { createSelector } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { ProductState } from '@interfaces/Product.state';

export const selectProductsFeature = (state: AppState) => state.products;

export const selectLoading = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.loading
);

export const selectListProducts = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.products
);

export const selectListLengthProducts = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.products.length
);
