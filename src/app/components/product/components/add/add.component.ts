import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { ProductService } from '@services/product.service';
import { SnackBarService } from '@services/snack-bar.service';
import { Product } from '@interfaces/Product';
import { addProduct } from '@state/actions/products.actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private snackBarService: SnackBarService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialog = this.dialog.open(AddDialogComponent, this.getDialogConfig());

    dialog.componentInstance.submitAction.subscribe((data) =>
      this.addProduct(data, dialog)
    );
  }

  getDialogConfig(): MatDialogConfig {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '700px';
    matDialogConfig.height = 'auto';
    matDialogConfig.autoFocus = false;

    return matDialogConfig;
  }

  addProduct(data: Product, dialog: any): void {
    dialog.componentInstance.sendingData = true;
    this.productService.setProduct(data).subscribe(
      (res: Product) => {
        dialog.close();
        this.store.dispatch(
          addProduct({
            product: res,
          })
        );
        this.snackBarService.launchSnackBar(
          'Producto agregado correctamente.',
          'success-snackbar'
        );
      },
      (err) => {
        dialog.componentInstance.sendingData = false;
        dialog.close();
        this.snackBarService.launchSnackBar(
          'Ocurrio un error al crear el producto.',
          'danger-snackbar'
        );
      }
    );
  }
}
