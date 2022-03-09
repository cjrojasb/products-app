import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';

import { ProductComponent } from './product.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';
import { AddComponent } from './components/add/add.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    ProductComponent,
    ListComponent,
    ItemComponent,
    AddComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class ProductModule {}
