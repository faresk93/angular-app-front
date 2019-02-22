import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../Service/auth.service';
import {Router} from '@angular/router';
import {User} from '../../Model/user/user.model';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {

    userForm: FormGroup;
    @ViewChild('login') loginElement: ElementRef;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notifier: ToastrService, private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.userForm = this.formBuilder.group({
            email: '',
            password: ''
        });
    }

    onSubmitForm() {
        const formValue = this.userForm.value;
        const user: User = new User(
            formValue['email'],
            formValue['password']
        );
        this.authService.logInUser(user).subscribe(
            (response) => {
                console.log('missing')
                localStorage.setItem('token', response['token']);
                localStorage.setItem('isAuth', JSON.stringify(true));
                this.router.navigate(['/articles']);
            },
            (error) => {
                console.log(error);
                this.spinner.hide();
                this.notifier.error('Please verify your email and password', 'Bad credentials');
            },
            () => {
                this.spinner.hide();
                this.notifier.success('You are successfully logged in!', 'Logged In');
            }
        );
        this.spinner.show();
    }
}
