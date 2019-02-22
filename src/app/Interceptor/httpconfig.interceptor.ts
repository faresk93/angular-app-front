import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../Service/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {


    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');
        if (token) {
            request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
        }

        request = request.clone({headers: request.headers.set('Accept', 'application/json')});

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                if (error.status === 401 && error.error.message === 'Expired JWT Token') {
                    this.authService.logoutOutUser();
                }
                return throwError(error);
            })
        )
            ;
    }
}
