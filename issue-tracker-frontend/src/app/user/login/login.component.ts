import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string
  public password: string

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  // onSubmit() {
  //   if()
  // }

  public goToSignUp: any = () => {
    this.router.navigate(['/sign-up']);
  } // end goToSignUp

  onSubmit() {
    if (this.form.valid) {
      this.signinFunction()
    }
  }

  public signinFunction: any = () => {
    if (!this.email) {
      this.toastr.warning('enter email')
    } else if (!this.password) {
      this.toastr.warning('enter password')
    } else {
      let data = {
        email: this.email,
        password: this.password
      }
      this.appService.loginFunction(data)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            console.log(apiResponse)
            Cookie.set('authToken', apiResponse.data.authToken);
            Cookie.set('receiverId', apiResponse.data.userDetails.userId);
            Cookie.set('receiverEmail', apiResponse.data.userDetails.email)
            Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
            this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
            setTimeout(() => {
              this.router.navigate(['dashboard']);
            }, 200)
          } else {
            this.toastr.error(apiResponse.message)
          }
        }, (err) => {
          this.toastr.info('Check your Username and Password')
        });
    } // end condition
  } // end signinFunction
}
