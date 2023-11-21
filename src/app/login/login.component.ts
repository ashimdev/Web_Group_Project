import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CognitoService, IUser } from '../app-services/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private _cognitoService: CognitoService,
              private _router: Router,
               private _messageService: MessageService) { }

  public OnClickLoginButton() {
    const user: IUser = this.getUser();
    this.signIn(user);
  }

  public signIn(user: IUser): void {
    this._cognitoService.signIn(user)
    .then(() => {
      this._router.navigate(['/home']);
    }).catch((err) => {
          console.error(err);
          this.showErrorViaToast();
    });
  }

  
  private getUser(): IUser {
    const user = {} as IUser;
    user.email = this.email;
    user.password = this.password;
    
    return user;
  }

  private showErrorViaToast() {
    this._messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Something went wrong.' });
  }

}
