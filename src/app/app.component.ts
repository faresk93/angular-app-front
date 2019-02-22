import {Component, HostListener} from '@angular/core';
import {AuthService} from './Service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener('window:unload', ['$event'])
  title = 'udemy-app';

  constructor(private authService: AuthService) {
  }

  handleUnload(event) {
    this.authService.logoutOutUser();
  }
}
