import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';
import { FormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globals } from '../globals'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [SignInService, Globals],
  
})
export class SignInComponent implements OnInit {
  formSignIn: FormGroup;
  errorMessage = '';
  
  constructor(private signInService: SignInService,
              private fb: FormBuilder,
              private router: Router,
              public authService: AuthService) { }

  ngOnInit() {
    this.formSignIn = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
    try{
      if (localStorage.getItem("isLoggedIn") == "true"){
        this.router.navigate(['/dashboard']);
      }
    }
    catch{

    }
  }

  onSubmit(){
    console.log(this.formSignIn.value.email);
    var valueToSend = this.formSignIn.value;
    delete valueToSend["recaptcha"];
    this.signInService.sendPost(valueToSend)
    .then(result => {
      if (result === undefined || result.length == 0) {
        this.errorMessage = "Sai email hoặc password";
      }
      else{
        this.errorMessage = 'Thành Công';
        this.authService.setLogin(true);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.formSignIn.value.email);
        this.router.navigate(['/dashboard']);
      }
    })
    .catch(err => console.log(err));
  }

  postToExpress(){
    const url = 'http://localhost:4200/signin';
    const headers = new Headers({ 'Content-Type' : 'application/json' });
    const body = JSON.stringify({ name: 'kbui' });
    // this.http.post(url, body, { headers })
    // .toPromise()
    // .then(res => res.text())
    // .then(resText => console.log(resText));
  }

  handleLoad(){

  }

}
