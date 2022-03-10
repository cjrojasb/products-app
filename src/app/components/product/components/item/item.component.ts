import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './../delete-dialog/delete-dialog.component';
import { ProductService } from '@services/product.service';
import { SnackBarService } from '@services/snack-bar.service';
import { Product } from '@interfaces/Product';
import { editProduct, deleteProduct } from '@state/actions/products.actions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() product: Product;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private snackBarService: SnackBarService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  openDialog(product: Product, type: string): void {
    switch (type) {
      case 'edit':
        this.openEditDialog(product);
        break;
      case 'delete':
        this.openDeleteDialog(product);
        break;
    }
  }

  async openEditDialog(product: Product): Promise<void> {
    const productSelected: Product = await this.getProduct(product.id);
    const dialog = this.dialog.open(EditDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });

    dialog.componentInstance.product = productSelected;
    dialog.componentInstance.submitAction.subscribe(({ product }) =>
      this.editProduct(product, dialog)
    );
  }

  async openDeleteDialog(product: Product): Promise<void> {
    const productSelected: Product = await this.getProduct(product.id);
    const dialog = this.dialog.open(DeleteDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });

    dialog.componentInstance.product = productSelected;
    dialog.componentInstance.deleteAction.subscribe(({ productId }) =>
      this.deleteProduct(productId, dialog)
    );
  }

  getProduct(id: number): Promise<Product> {
    return new Promise((resolve, rejected) => {
      this.productService.getProduct(id).subscribe(
        (res) => resolve(res),
        (err) => rejected(err)
      );
    });
  }

  editProduct(product: Product, dialog: any): void {
    dialog.componentInstance.sendingData = true;
    this.productService.updateProduct(product.id, product).subscribe(
      (res) => {
        this.store.dispatch(
          editProduct({
            product: product,
          })
        );
        dialog.close();
        this.snackBarService.launchSnackBar(
          'Producto editado correctamente.',
          'success-snackbar'
        );
      },
      (err) => {
        dialog.componentInstance.sendingData = false;
        dialog.close();
        this.snackBarService.launchSnackBar(
          'Ocurrio un error al editar el producto.',
          'danger-snackbar'
        );
      }
    );
  }

  deleteProduct(id: number, dialog: any): void {
    dialog.componentInstance.sendingData = true;
    this.productService.deleteProduct(id).subscribe(
      (res) => {
        this.store.dispatch(
          deleteProduct({
            id: id,
          })
        );
        dialog.close();
        this.snackBarService.launchSnackBar(
          'Producto eliminado correctamente.',
          'success-snackbar'
        );
      },
      (err) => {
        dialog.componentInstance.sendingData = false;
        dialog.close();
        this.snackBarService.launchSnackBar(
          'Ocurrio un error al eliminar el producto.',
          'danger-snackbar'
        );
      }
    );
  }
}
