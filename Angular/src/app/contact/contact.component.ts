import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
    public ContactForm: any;

    constructor(private formBuilder: FormBuilder, private router: Router) {}

    ngOnInit() {
        this.ContactForm = this.formBuilder.group({
            name: ['', Validators.required],
            subject: ['', Validators.required],
            contact: ['', Validators.pattern(/^\(\d{3}\)-\d{3}-\d{4}$/)],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required],
            invalidText: [''],
        });
    }
    


    public OnClickSubmitForm() {
        if (this.ContactForm.valid) {
            // Handle form submission logic
            this.sendEmail();
            this.router.navigate(['home']);
        } else {
            // Form is invalid, display error messages
            this.markFormGroupTouched(this.ContactForm);
        }
    }
        
    public IsInvalid(controlName: string) {
      return (
          this.ContactForm.get(controlName).invalid &&
          (this.ContactForm.get(controlName).dirty ||
              this.ContactForm.get(controlName).touched)
      );
  }

    private markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    private sendEmail(): void {
        const name = this.ContactForm.controls['name'].value;
        const email = this.ContactForm.controls['email'].value;
        const contact = this.ContactForm.controls['contact'].value;
        const message = this.ContactForm.controls['message'].value;
        const subject = this.ContactForm.controls['subject'].value;
        const body = `${message} \n\nName: ${name} \nContact: ${contact}\nEmail: ${email}`;

        const mailtoLink = `mailto:contact@videosphere.com?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    }
}
