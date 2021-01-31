import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  currentUser: any = null;
  currentUserSubcription: Subscription | null = null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    // chỉ lấy đc 1 lần duy nhất, khi currentUser trong AuthService thay đổi ta sẽ k lấy đc value mới
    // this.currentUser = this.auth.currentUser.value

    // theo dõi sự thay đổi của biến currentUser trong service, mỗi lần currentUser
    // thay đổi sẽ nhảy vào trong callback next và nhận được giá trị mới
    this.currentUserSubcription = this.auth.currentUser.asObservable().subscribe({
      next: (result) => {
        this.currentUser = result;
      }
    })
  }

  // chạy trước khi component bị hủy
  ngOnDestroy(): void {
    // Hủy theo dõi biến currentUser khi component bị unmount
    this.currentUserSubcription?.unsubscribe();
  }

}
