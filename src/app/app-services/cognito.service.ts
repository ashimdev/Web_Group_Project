import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Amplify, Auth } from 'aws-amplify';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;
  congitoUser = new BehaviorSubject(null);
  userDetail: any = null;
  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public newPasswword2(user: IUser): Promise<any> {
    user.email = "asimbatajoo@gmail.com";
    user.name = "centennialadmin";
    user.password = "Centennial1!";
    return Auth.completeNewPassword(user, "Centennial1!");
  }

  newPasswword(user: IUser) {
    // subscribe to cognito user (behaviour subject) and use the value it returned.
        // this.congitoUser.subscribe((value) => {
        //   console.warn(value);
        //   Auth.completeNewPassword(value,  "Centennial2!", [])
        //     .then((data) => {
        //      console.log(data);
        //     })
        //     .catch((err) => console.error('Error', err));
        // });
    }

    public getAccessToken() {
      if (!this.updateUser) return '';

      return this.userDetail?.signInUserSession.accessToken.jwtToken;
    }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn2(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      console.warn(this.getUser());
      this.authenticationSubject.next(true);
    });
  }

  signIn(user: IUser) {
    return Auth.signIn(user.email, user.password)
      .then((data) => {
        console.warn(data);
        this.userDetail = data;
        this.congitoUser.next(data);
        if (user) {
          if (data.challengeName === 'NEW_PASSWORD_REQUIRED') {
            alert("new password");
          }
        }
      });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

}