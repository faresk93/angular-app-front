import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../Service/auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  isLoggedIn() {
    return JSON.parse(localStorage.getItem('isAuth'));
  }

  onLogout() {
    this.authService.logoutOutUser();
    this.router.navigate(['auth']);
  }
}
