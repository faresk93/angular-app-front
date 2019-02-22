import {Injectable, ViewChild} from '@angular/core';
import {User} from '../Model/user/user.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
@ViewChild('login')
export class AuthService {

    url = 'http://127.0.0.1:8000/api/login_check';
    isAuth = false;

    constructor(private http: HttpClient, private router: Router, private notifier: ToastrService, private spinner: NgxSpinnerService) {
    }

    logInUser(user: User) {
        return this.http.post(this.url, user);
    }

    logoutOutUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        this.router.navigate(['auth']).then(
            () => {
                this.notifier.warning('You are successfully logged out!', 'Logout Successful');
            }
        );
    }
}
