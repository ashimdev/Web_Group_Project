import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DefaultService } from '../api/default.service';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss']
})
export class UserListPageComponent implements OnInit {

  public Loading = false;
  public UserList: User[] = [];

  constructor(
    private _defaultService: DefaultService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  public onClickEditButton(userID: string) {
    this.router.navigate([`./setting/user/${userID}`]);
  }

  public onClickCreateButton() {
    this.router.navigate([`./setting/user/create`]);
  }

  public onClickDeleteButton(event: Event, userID: string) {
    this.confirmationService.confirm({
      key: 'delete',
      target: event.target || new EventTarget(),
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(userID);
      }
    });
  }

  private deleteUser(userID: string) {
    this._defaultService.userUserIDDelete(userID)
      .subscribe({
        next: () => {
          this.showInfoViaToast("User deleted.");
          this.getUserList();
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private showInfoViaToast(message: string) {
    this.messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: message });
  }

  private showErrorViaToast() {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Something went wrong.' });
  }

  private getUserList() {
    this.Loading = true;
    this._defaultService.userGet()
      .subscribe({
        next: (userList: any) => {
          this.UserList = userList.sort(this.dynamicSort("userEmail"));
          this.Loading = false;
        },
        error: (err) => {
          console.error(err);
          this.Loading = false;
        }
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  private dynamicSort(property: string) {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: any, b: any) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    };
  }

}
