import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from '@services/product.service';
import { ACTION_CONSTANTS } from '@state/constants/constants';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ACTION_CONSTANTS.LOAD_PRODUCTS),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ({
            type: ACTION_CONSTANTS.LOADED_PRODUCTS,
            products: products,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
