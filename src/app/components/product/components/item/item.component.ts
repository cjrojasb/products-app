import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './../delete-dialog/delete-dialog.component';
import { ProductService } from '@services/product.service';
import { SnackBarService } from '@services/snack-bar.service';
import { Product } from '@interfaces/Product';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private snackBarService: SnackBarService
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
    const dialog = this.dialog.open(
      EditDialogComponent,
      this.getDialogConfig()
    );

    dialog.componentInstance.product = productSelected;
    dialog.componentInstance.submitAction.subscribe(({ productId, product }) =>
      this.editProduct(productId, product, dialog)
    );
  }

  async openDeleteDialog(product: Product): Promise<void> {
    const productSelected: Product = await this.getProduct(product.id);
    const dialog = this.dialog.open(
      DeleteDialogComponent,
      this.getDialogConfig()
    );

    dialog.componentInstance.product = productSelected;
    dialog.componentInstance.deleteAction.subscribe(({ productId }) =>
      this.deleteProduct(productId, dialog)
    );
  }

  getDialogConfig(): MatDialogConfig {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '700px';
    matDialogConfig.height = 'auto';
    matDialogConfig.autoFocus = false;

    return matDialogConfig;
  }

  getProduct(id: number): Promise<Product> {
    return new Promise((resolve, rejected) => {
      this.productService.getProduct(id).subscribe(
        (res) => resolve(res),
        (err) => rejected(err)
      );
    });
  }

  editProduct(productId: number, product: Product, dialog: any): void {
    dialog.componentInstance.sendingData = true;
    this.productService.updateProduct(productId, product).subscribe(
      (res) => {
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

  deleteProduct(productId: number, dialog: any): void {
    dialog.componentInstance.sendingData = true;
    this.productService.deleteProduct(productId).subscribe(
      (res) => {
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
