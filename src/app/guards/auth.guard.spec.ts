import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '@services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('Can activate true', () => {
    const check = authService.checkIsLogged();
    if (check) {
      expect(guard.canActivate()).toBeTruthy();
      expect(guard.canActivate()).toBe(true);
    } else {
      expect(guard.canActivate()).toBeFalsy();
      expect(guard.canActivate()).toBe(false);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
    }
  });
});
