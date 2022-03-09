import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@interfaces/Product';
import { CONSTANTS } from '@constants/constants';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  @Input() sendingData: boolean = false;
  @Output() submitAction = new EventEmitter<{
    product: Product;
  }>();
  public sizes: Array<string> = CONSTANTS.SIZES;
  public brands: Array<string> = CONSTANTS.BRANDS;
  public images: Array<string> = CONSTANTS.IMAGES;
  productForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const { id, sku, name, brand, size, price, imageUrl } = this.product;

    this.productForm = this.builder.group({
      id: [id, Validators.required],
      sku: [
        sku,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      name: [name, Validators.required],
      brand: [brand, Validators.required],
      size: [size, Validators.required],
      price: [price, Validators.required],
      imageUrl: [imageUrl, Validators.required],
    });
  }

  submitForm(data: Product): void {
    if (this.productForm.valid) {
      this.submitAction.emit({
        product: data,
      });
    }
  }
}
