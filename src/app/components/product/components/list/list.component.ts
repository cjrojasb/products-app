import { Component, OnInit } from '@angular/core';
import { ProductService } from '@services/product.service';
import { Product } from '@interfaces/Product';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
