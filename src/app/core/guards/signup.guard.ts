import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupComponent } from 'src/app/main/signup/signup.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanDeactivate<SignupComponent> {
  constructor(private auth: AuthService ,private router: Router){}
  canDeactivate(
    component: SignupComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return về true => cho phép rời khỏi route
      const isDirty = component.signupForm.dirty && !component.signupForm.submitted;
      if (isDirty) {
        const isConfirm = confirm('Bạn có muốn rời khỏi, tất cả dữ liệu sẽ bị mất');
        return isConfirm;
      }
      return true;
  }
  
}
