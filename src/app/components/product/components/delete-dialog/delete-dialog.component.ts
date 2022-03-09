import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@interfaces/Product';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  @Input() sendingData: boolean = false;
  @Output() deleteAction = new EventEmitter<{
    productId: number;
  }>();
  accepted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    public dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {}

  ngOnInit(): void {}

  delete(): void {
    this.deleteAction.emit({
      productId: this.product.id,
    });
  }
}
