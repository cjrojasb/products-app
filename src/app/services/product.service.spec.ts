import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { PRODUCT_MOCK, PRODUCTS_MOCK } from '@mocks/productsMock.spec';
import { of } from 'rxjs';

import { ProductService } from './product.service';
import { environment } from '../../environments/environment';

describe('ProductService', () => {
  let apiUrl = environment.apiUrl;
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get products', () => {
    httpClientSpy.get.and.returnValue(of(PRODUCTS_MOCK));
    service.getProducts().subscribe((response) => {
      expect(response).toEqual(PRODUCTS_MOCK);
    });
    const testReq: TestRequest = httpTestingController.expectOne(
      `${apiUrl}/products`
    );
    expect(testReq.request.method).toBe('GET');
    testReq.flush(PRODUCTS_MOCK);
    httpTestingController.verify();
  });

  it('Get product', () => {
    httpClientSpy.get.and.returnValue(of(PRODUCT_MOCK));
    service.getProduct(1).subscribe((response) => {
      expect(response).toEqual(PRODUCT_MOCK);
    });
    const testReq: TestRequest = httpTestingController.expectOne(
      `${apiUrl}/products/1`
    );
    expect(testReq.request.method).toBe('GET');
    testReq.flush(PRODUCT_MOCK);
    httpTestingController.verify();
  });

  it('Add product', () => {
    httpClientSpy.post.and.returnValue(of(PRODUCT_MOCK));
    service.setProduct(PRODUCT_MOCK).subscribe((response) => {
      expect(response).toEqual(PRODUCT_MOCK);
    });
    const testReq: TestRequest = httpTestingController.expectOne(
      `${apiUrl}/products`
    );
    expect(testReq.request.method).toBe('POST');
    testReq.flush(PRODUCT_MOCK);
    httpTestingController.verify();
  });

  it('Update product', () => {
    httpClientSpy.put.and.returnValue(of(PRODUCT_MOCK));
    service.updateProduct(1, PRODUCT_MOCK).subscribe((response) => {
      expect(response).toEqual(PRODUCT_MOCK);
    });
    const testReq: TestRequest = httpTestingController.expectOne(
      `${apiUrl}/products/1`
    );
    expect(testReq.request.method).toBe('PUT');
    testReq.flush(PRODUCT_MOCK);
    httpTestingController.verify();
  });

  it('Delete product', () => {
    httpClientSpy.delete.and.returnValue(of(PRODUCT_MOCK));
    service.deleteProduct(1).subscribe((response) => {
      expect(response).toEqual(PRODUCT_MOCK);
    });
    const testReq: TestRequest = httpTestingController.expectOne(
      `${apiUrl}/products/1`
    );
    expect(testReq.request.method).toBe('DELETE');
    testReq.flush(PRODUCT_MOCK);
    httpTestingController.verify();
  });
});
