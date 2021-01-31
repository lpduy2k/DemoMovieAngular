import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //return về true => cho phép truy cập vào route
  
    // kết nối tới AuthService lấy biến currentUser và kiếm tra
    const currentUser = this.auth.currentUser.value
    if (currentUser) {
      if (currentUser.maLoaiNguoiDung === 'QuanTri') {
        return true;
      }
      // đã đăng nhập nhưng maLoaiNguoiDung khác QuanTri, redirect về trang Home
      this.router.navigateByUrl('/');
      return false;
    }
    // đưa đăng nhập, redirect về trang Signin
    this.router.navigateByUrl('/signin');
    return false;
  }
}
