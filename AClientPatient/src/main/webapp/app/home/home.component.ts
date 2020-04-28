import { Component, OnInit, OnDestroy, Renderer, ElementRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

import { LoginService } from 'app/core/login/login.service';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss', 'login.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError = false;
  account: Account | null = null;
  authSubscription?: Subscription;
  
  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false]
  });
  
  constructor(
    private accountService: AccountService, 
//    private loginModalService: LoginModalService,
    private loginService: LoginService,
    private renderer: Renderer,
    private router: Router,
//    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

//  login(): void {
//    this.loginModalService.open();
//  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  
//  ngAfterViewInit(): void {
//    if (this.username) {
//      this.renderer.invokeElementMethod(this.username.nativeElement, 'focus', []);
//    }
// }

//  cancel(): void {
//    this.authenticationError = false;
//    this.loginForm.patchValue({
//      username: '',
//      password: ''
//    });
//    this.activeModal.dismiss('cancel');
//  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          // this.activeModal.close();
          if (
            this.router.url === '/account/register' ||
            this.router.url.startsWith('/account/activate') ||
            this.router.url.startsWith('/account/reset/')
          ) {
            this.router.navigate(['']);
          } else {
          	this.router.navigate(['dashboard']);
          }
        },
        () => (this.authenticationError = true)
      );
  }

  register(): void {
//    this.activeModal.dismiss('to state register');
    this.router.navigate(['/account/register']);
  }

  requestResetPassword(): void {
//    this.activeModal.dismiss('to state requestReset');
    this.router.navigate(['/account/reset', 'request']);
  }
  
}
