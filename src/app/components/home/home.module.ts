import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@modules/shared.module';

import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
