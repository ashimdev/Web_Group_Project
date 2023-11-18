import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../app-services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _userService: UserService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        if (!request.url.includes("/businessContact")) {
            return next.handle(request);
        }

        // Get the access token from your authentication service
        const accessToken = this._userService.GetAccessToken();

        // Clone the request and add the "x-access-token" header
        const modifiedRequest = request.clone({
            headers: request.headers.set(
                "x-access-token",
                `${accessToken}`
            )
        });

        // Pass the modified request to the next interceptor or the HTTP handler
        return next.handle(modifiedRequest);
    }
}
