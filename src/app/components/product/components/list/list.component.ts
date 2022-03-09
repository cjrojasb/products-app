import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import {
  selectLoading,
  selectListProducts,
  selectListLengthProducts
} from '@state/selectors/products.selector';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  loading$: Observable<boolean> = new Observable();
  products$: Observable<any> = new Observable();
  productsLength$: Observable<number> = new Observable();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
    this.products$ = this.store.select(selectListProducts);
    this.productsLength$ = this.store.select(selectListLengthProducts);
  }
}
