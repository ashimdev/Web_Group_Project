import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CognitoService, IUser } from '../app-services/cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public email: string = '';
  public password: string = '';
  public code: string = '';
  public isConfirm = false;

  constructor(private _cognitoService: CognitoService,
              private _router: Router,
               private _messageService: MessageService) { }

  public OnClickSignUpButton() {
    const user: IUser = this.getUser();
    this._cognitoService.newPasswword(user);
    //  this.signUp(user);
  }

  public signUp(user: IUser): void {
    this._cognitoService.signUp(user)
    .then(() => {
      this.isConfirm = true;
    }).catch((err) => {
          console.error(err);
          this.showErrorViaToast();
    });
  }
  private getUser() {
    const user = {} as any;
    user.name = this.email;
    user.attributes = {};
    user.attributes.email = "asimbatajoo@gmail.com";
    user.password = this.password;
    
    return user;
  }

  public confirmSignUp(): void {
    const user = this.getUser();
    user.code = this.code;
    
    this._cognitoService.confirmSignUp(user)
    .then(() => {
      this._router.navigate(['/signIn']);
    }).catch((err) => {
      console.error(err);
      this.showErrorViaToast();
    });
  }

  private showErrorViaToast() {
    this._messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Something went wrong.' });
  }
}
