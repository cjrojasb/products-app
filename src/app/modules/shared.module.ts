import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@modules/material.module';

import { HeaderComponent } from '@shared/components/header/header.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@NgModule({
  declarations: [HeaderComponent, LoadingComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [HeaderComponent, LoadingComponent],
})
export class SharedModule {}
