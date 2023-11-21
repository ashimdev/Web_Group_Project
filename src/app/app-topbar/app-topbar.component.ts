import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../app-services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.scss']
})
export class AppTopbarComponent implements OnInit {
  public MenuItems: any;
  
  constructor(public _router: Router,
    private _userService: UserService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.setMenuItems();
  }

  public OnClickRoute(path: string): void {
    this._router.navigate([path]);
  }

  public get IsUserLoggedIn(): boolean {
    return (this._userService.GetAccessToken() ? true : false);
  }

  private setMenuItems() {
    this.MenuItems = [
      {
        label: '',
        items: [
          {
            label: 'Video Playlist',
            icon: 'pi pi-list',
            command: () => {
              this._router.navigate(['setting/videoPlaylist']);
            }
          },
          {
            label: 'Video',
            icon: 'pi pi-video',
            command: () => {
              this._router.navigate(['setting/video']);
            }
          },
          {
            label: 'User',
            icon: 'pi pi-users',
            command: () => {
              this._router.navigate(['setting/user']);
            }
          },
        ]
      }
    ];
  }

  OnClickLogout() {
    this._confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?',
      accept: () => {
        this._userService.Logout();
        this.showInfoViaToast("Logged out successfully.");
        this._router.navigate(['./home']);
      }
    });
  }

  private showInfoViaToast(message: string) {
    this._messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: message });
  }

}