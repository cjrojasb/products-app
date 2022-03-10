import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '@modules/material.module';
import { PRODUCT_MOCK } from '@mocks/productsMock.spec';

import { AddDialogComponent } from './add-dialog.component';

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDialogComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Submit form', () => {
    spyOn(component.submitAction, 'emit');
    const { sku, name, brand, size, price, imageUrl } = PRODUCT_MOCK;
    component.productForm = new FormGroup({
      sku: new FormControl(sku),
      name: new FormControl(name),
      brand: new FormControl(brand),
      size: new FormControl(size),
      price: new FormControl(price),
      imageUrl: new FormControl(imageUrl),
    });
    component.submitForm(PRODUCT_MOCK);
    expect(component.productForm.value).toEqual(component.productForm.value);
    expect(component.submitAction.emit).toHaveBeenCalled();
  });
});
