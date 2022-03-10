import { PRODUCT_MOCK } from '@mocks/productsMock.spec';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MaterialModule } from '@modules/material.module';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from '@state/app.state';
import { SnackBarService } from '@services/snack-bar.service';
import { ProductService } from '@services/product.service';
import { Product } from '@interfaces/Product';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { AddComponent } from './add.component';
import { AddDialogComponent } from './../add-dialog/add-dialog.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let spySnackBarService: jasmine.SpyObj<SnackBarService>;
  let spyProductService: jasmine.SpyObj<ProductService>;
  let productResponse: Observable<Product>;

  beforeEach(async () => {
    spySnackBarService = jasmine.createSpyObj<SnackBarService>(
      'SnackBarService',
      ['launchSnackBar']
    );
    spyProductService = jasmine.createSpyObj<ProductService>('ProductService', [
      'setProduct',
    ]);
    productResponse = new BehaviorSubject<Product>(PRODUCT_MOCK);
    spyProductService.setProduct.and.returnValue(productResponse);
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
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
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Open dialog ', () => {
    spyOn(component, 'addProduct');
    spyOn(component.dialog, 'open').and.callThrough();
    component.openDialog();
    expect(component.dialog.open).toHaveBeenCalledWith(AddDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });
    component.addProduct(PRODUCT_MOCK, component.dialog);
    expect(component.addProduct).toHaveBeenCalled();
  });

  it('Add product', () => {
    const dialog = component.dialog.open(AddDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });

    component.addProduct(PRODUCT_MOCK, dialog);
    spySnackBarService.launchSnackBar(
      'Producto agregado correctamente.',
      'success-snackbar'
    );
    expect(spyProductService.setProduct).toHaveBeenCalled();
    expect(spySnackBarService.launchSnackBar).toHaveBeenCalled();
  });


  it('Add product failed', () => {
    spyProductService.setProduct.and.returnValue(
      throwError({
        status: 500,
        message: 'Error message',
      })
    );
    const dialog = component.dialog.open(AddDialogComponent, {
      width: '700px',
      height: 'auto',
      autoFocus: false,
    });

    component.addProduct(PRODUCT_MOCK, dialog);
    spySnackBarService.launchSnackBar(
      'Ocurrio un error al agregar el producto.',
      'danger-snackbar'
    );
    expect(spyProductService.setProduct).toHaveBeenCalled();
  });
});
