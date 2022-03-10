import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@modules/shared.module';
import { ROOT_REDUCERS } from '@state/app.state';

import { ListComponent } from './list.component';
import { AddComponent } from './../add/add.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent, AddComponent],
      imports: [
        StoreModule.forRoot(ROOT_REDUCERS),
        SharedModule,
        HttpClientModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
