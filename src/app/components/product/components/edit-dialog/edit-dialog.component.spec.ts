import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditDialogComponent } from './edit-dialog.component';
import { PRODUCT_MOCK } from '@mocks/productsMock.spec';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDialogComponent],
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
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Submit form', () => {
    spyOn(component.submitAction, 'emit');
    const { id, sku, name, brand, size, price, imageUrl } = PRODUCT_MOCK;
    component.productForm = new FormGroup({
      id: new FormControl(id),
      sku: new FormControl(sku),
      name: new FormControl(name),
      brand: new FormControl(brand),
      size: new FormControl(size),
      price: new FormControl(price),
      imageUrl: new FormControl(imageUrl),
    });
    component.submitForm(PRODUCT_MOCK);
    expect(component.productForm.value).toEqual(PRODUCT_MOCK);
    expect(component.submitAction.emit).toHaveBeenCalled();
  });
});
