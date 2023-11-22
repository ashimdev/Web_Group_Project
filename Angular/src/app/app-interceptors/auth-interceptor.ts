import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../app-services/user.service';
import { CognitoService } from '../app-services/cognito.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _cognitoService: CognitoService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        if (!this._cognitoService.userDetail) {
            return next.handle(request);
        }

        if (request.url.includes("centennial-video-source.s3.amazonaws.com")) {
            return next.handle(request);
        }        

        // Get the access token from your authentication service
        const accessToken = this._cognitoService.getAccessToken();

        // Clone the request and add the "x-access-token" header
        const modifiedRequest = request.clone({
            headers: request.headers.set(
                "Authorization",
                `${accessToken}`
            )
        });

        // Pass the modified request to the next interceptor or the HTTP handler
        return next.handle(modifiedRequest);
    }
}
