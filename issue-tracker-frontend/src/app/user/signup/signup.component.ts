import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public email: any;
  public userName: any;
  public password: any;
  public mobileNumber: any;

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  onSubmit() {
    if (this.form.valid) {
      this.signUpFunction()
    }
  }

  public goToSignIn: any = () => {
    this.router.navigate(['/']);
  } // end goToSignIn

  public signUpFunction: any = () => {
    if (!this.firstName) {
      this.toastr.warning('enter first name')
    } else if (!this.lastName) {
      this.toastr.warning('enter last name')
    } else if (!this.mobileNumber) {
      this.toastr.warning('enter mobileNumber')
    } else if (!this.email) {
      this.toastr.warning('enter email')
    } else if (!this.password) {
      this.toastr.warning('enter password')
    } else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNumber: this.mobileNumber,
        email: this.email,
        password: this.password,
      }
      console.log(data);
      this.appService.signUpFunction(data)
        .subscribe((apiResponse) => {
          console.log(apiResponse);
          if (apiResponse.status === 200) {
            this.toastr.success('Signup successful');
            setTimeout(() => {
              this.goToSignIn();
            }, 500);
          } else {
            this.toastr.error(apiResponse.message);
          }
        }, (err) => {
          this.toastr.error('some error occured');
        });
    } // end condition
  } // end signupFunction



}