import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../app-services/user.service';
import { CognitoService } from '../app-services/cognito.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _cognitoService: CognitoService,
    private _router: Router
) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const accessToken = this._cognitoService.isUserSingedIn();
      if (!accessToken){
        this._router.navigate(['./login']);
        return false;
      }
      
      return true;
  }
  
}
