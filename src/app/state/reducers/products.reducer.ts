import { createReducer, on } from '@ngrx/store';

import {
  loadProducts,
  loadedProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from '../actions/products.actions';
import { ProductState } from '@interfaces/Product.state';
import { Product } from '@interfaces/Product';

export const initialState: ProductState = { loading: false, products: [] };

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedProducts, (state, { products }) => {
    return { ...state, loading: false, products: products };
  }),
  on(addProduct, (state, { product }) => {
    return { ...state, products: [product, ...state.products] };
  }),
  on(editProduct, (state, { product }) => {
    const updatedProducts: Product[] = state.products.map((prevProduct) =>
      prevProduct.id === product.id ? product : prevProduct
    );

    return {
      ...state,
      products: updatedProducts,
    };
  }),
  on(deleteProduct, (state, { id }) => {
    const updatedProducts: Product[] = state.products.filter(
      (prevProduct) => prevProduct.id !== id
    );

    return {
      ...state,
      products: updatedProducts,
    };
  })
);
