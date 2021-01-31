import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // thay đổi request
    const currentUser = this.auth.currentUser.value;
    if (currentUser) {
      const {accessToken} = currentUser;
      // kiểm tra neeys có currentUser sẽ thêm Authorization vào headers
      request = request.clone({
        headers: request.headers.append("Authorization",`Bearer ${accessToken}`)
      })
    }
    return next.handle(request);
  }
}
