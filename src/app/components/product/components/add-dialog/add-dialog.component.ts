import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from '@interfaces/Product';
import { CONSTANTS } from '@constants/constants';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  @Input() sendingData: boolean = false;
  @Output() submitAction = new EventEmitter();
  public sizes: Array<string> = CONSTANTS.SIZES;
  public brands: Array<string> = CONSTANTS.BRANDS;
  public images: Array<string> = CONSTANTS.IMAGES;
  productForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.productForm = this.builder.group({
      sku: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      name: ['', Validators.required],
      brand: ['', Validators.required],
      size: ['', Validators.required],
      price: [null, Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  submitForm(data: Product): void {
    if (this.productForm.valid) {
      this.submitAction.emit(data);
    }
  }
}
