import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DefaultService } from '../api/default.service';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnInit {
  public userForm: any;
  public userID: string = '';
  public userTypeOptions: any[] = [
    { label: 'Regular', value: 'REG' },
    { label: 'Admin', value: 'ADM' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private _defaultService: DefaultService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.readRouteParameters();
  }

  onClickSubmitForm() {
    if (this.userForm.valid) {
      // Update the component code to call the necessary service method for API requests
      // if (this.userID) {
      //   this.updateUser();
      //   return;
      // }

      this.createUser();
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  onClickCancelButton() {
    this.navigateToUserPage();
  }

  onClickDeleteButton(event: Event) {
    this.confirmationService.confirm({
      key: 'delete',
      target: event.target || new EventTarget,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(this.userID);
      }
    });
  }

  isInvalid(controlName: string) {
    return (
      this.userForm.get(controlName).invalid &&
      (this.userForm.get(controlName).dirty ||
        this.userForm.get(controlName).touched)
    );
  }

  private deleteUser(userID: string) {
    this._defaultService.userUserIDDelete(userID)
      .subscribe({
        next: () => {
          this.showInfoViaToast('User deleted.');
          this.navigateToUserPage();
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private initializeForm() {
    this.userForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userTypeCode: ['', Validators.required],
      password: ['', Validators.required],
      userDescription: ['', Validators.maxLength(200)]
    });
  }

  private readRouteParameters() {
    this.activatedRoute.params.subscribe(params => {
      this.userID = params['userID'];

      if (this.userID === 'create') return;
      // Implement code to fetch user details using the service method
    });
  }

  private createUser() {
    this._defaultService.userPost(this.userForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['./setting/user']);
          this.showInfoViaToast('User Created Successfully.');
        },
        error: (err) => {
          console.error(err);
          this.showErrorViaToast();
        }
      });
  }

  // private updateUser() {
  //   this._defaultService.updateUser(this.userID, this.userForm.value)
  //     .subscribe({
  //       next: () => {
  //         this.router.navigate(['./user']);
  //         this.showInfoViaToast('User Updated Successfully.');
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         this.showErrorViaToast();
  //       }
  //     });
  // }

  private navigateToUserPage() {
    this.router.navigate(['./setting/user']);
  }

  private showInfoViaToast(message: string) {
    this.messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: message });
  }

  private showErrorViaToast() {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Something went wrong.' });
  }
}
