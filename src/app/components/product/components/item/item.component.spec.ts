import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '@modules/material.module';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from '@state/app.state';
import { PRODUCT_MOCK } from '@mocks/productsMock.spec';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { ItemComponent } from './item.component';
import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { ProductService } from '@services/product.service';
import { SnackBarService } from '@services/snack-bar.service';
import { Product } from '@interfaces/Product';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let spySnackBarService: jasmine.SpyObj<SnackBarService>;
  let spyProductService: jasmine.SpyObj<ProductService>;
  let productResponse: Observable<Product>;

  beforeEach(async () => {
    spySnackBarService = jasmine.createSpyObj<SnackBarService>(
      'SnackBarService',
      ['launchSnackBar']
    );
    spyProductService = jasmine.createSpyObj<ProductService>('ProductService', [
      'getProduct',
      'updateProduct',
      'deleteProduct',
    ]);
    productResponse = new BehaviorSubject<Product>(PRODUCT_MOCK);
    spyProductService.getProduct.and.returnValue(productResponse);
    spyProductService.updateProduct.and.returnValue(productResponse);
    spyProductService.deleteProduct.and.returnValue(productResponse);

    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
        MaterialModule,
        StoreModule.forRoot(ROOT_REDUCERS),
      ],
      providers: [
        {
          provide: ProductService,
          useValue: spyProductService,
        },
        {
          provide: SnackBarService,
          useValue: spySnackBarService,
        },
        MatDialog,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Open dialog, case edit', () => {
    spyOn(component, 'openEditDialog');
    component.openDialog(PRODUCT_MOCK, 'edit');
    expect(component.openEditDialog).toHaveBeenCalled();
  });

  it('Open dialog, case delete', () => {
    spyOn(component, 'openDeleteDialog');
    component.openDialog(PRODUCT_MOCK, 'delete');
    expect(component.openDeleteDialog).toHaveBeenCalled();
  });

  it('Async open edit dialog', async () => {
    spyOn(component, 'getProduct');
    component.openEditDialog(PRODUCT_MOCK);
    const dialog = component.dialog.open(EditDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });
    expect(component.getProduct).toHaveBeenCalled();
  });

  it('Async open delete dialog', async () => {
    spyOn(component, 'getProduct');
    component.openDeleteDialog(PRODUCT_MOCK);
    const dialog = component.dialog.open(DeleteDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });
    expect(component.getProduct).toHaveBeenCalled();
  });

  it('Get product', () => {
    component.getProduct(1);
    expect(spyProductService.getProduct).toHaveBeenCalled();
  });

  it('Get product failed', () => {
    spyProductService.getProduct.and.returnValue(
      throwError({
        status: 500,
        message: 'Error message',
      })
    );
    component.getProduct(1);
    expect(spyProductService.getProduct).toHaveBeenCalled();
  });

  it('Edit product', () => {
    const dialog = component.dialog.open(EditDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });

    component.editProduct(PRODUCT_MOCK, dialog);
    spySnackBarService.launchSnackBar(
      'Producto editado correctamente.',
      'success-snackbar'
    );
    expect(spyProductService.updateProduct).toHaveBeenCalled();
    expect(spySnackBarService.launchSnackBar).toHaveBeenCalled();
  });

  it('Edit product failed', () => {
    spyProductService.updateProduct.and.returnValue(
      throwError({
        status: 500,
        message: 'Error message',
      })
    );
    const dialog = component.dialog.open(EditDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });

    component.editProduct(PRODUCT_MOCK, dialog);
    spySnackBarService.launchSnackBar(
      'Ocurrio un error al editar el producto.',
      'danger-snackbar'
    );
    expect(spyProductService.updateProduct).toHaveBeenCalled();
    expect(spySnackBarService.launchSnackBar).toHaveBeenCalled();
  });

  it('Delete product', () => {
    const dialog = component.dialog.open(DeleteDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });

    component.deleteProduct(1, dialog);
    spySnackBarService.launchSnackBar(
      'Producto eliminado correctamente.',
      'success-snackbar'
    );
    expect(spyProductService.deleteProduct).toHaveBeenCalled();
    expect(spySnackBarService.launchSnackBar).toHaveBeenCalled();
  });

  it('Delete product failed', () => {
    spyProductService.deleteProduct.and.returnValue(
      throwError({
        status: 500,
        message: 'Error message',
      })
    );
    const dialog = component.dialog.open(DeleteDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });

    component.deleteProduct(1, dialog);
    spySnackBarService.launchSnackBar(
      'Ocurrio un error al eliminar el producto.',
      'danger-snackbar'
    );
    expect(spyProductService.deleteProduct).toHaveBeenCalled();
  });
});
