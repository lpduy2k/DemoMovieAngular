import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<any>(null);
  // currentUser.next(values) => set giá trị cho biến currentUser
  // currentUser.value => Get giá trị của biến currentUser
  // currentUser.asObservable() => chuyển currentUser thành 1 Observable

  constructor(private api: ApiService) {}

  signin(values: any): Observable<any> {
    const url =
      'QuanLyNguoiDung/DangNhap';

    return this.api.post(url, values);
  }

  signup(values: any): Observable<any> {
    const url = 'QuanLyNguoiDung/DangKy';

    return this.api.post(url, { ...values, maNhom: 'GP01' });
  }
}





