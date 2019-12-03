import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [SignUpService]
})
export class SignUpComponent implements OnInit {
  formSignUp: FormGroup;
  errorMessage = '';
  classResponse = 'text-danger';

  constructor(private fb: FormBuilder,
              private signUpService: SignUpService) { 
    
  }

  ngOnInit() {
    this.formSignUp = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required],
      subject: this.fb.group({
        hs: false,
        sv: false,
        other: true
      }),
    });
  }

  onSubmit(){
    console.log("Submit");
    var valueToSend = this.formSignUp.value;
    delete valueToSend["recaptcha"];
    // console.log(valueToSend);
    this.signUpService.sendPost(valueToSend)
    .then(result => {
      console.log(result["result"])
      if (result["result"] == "success"){
        this.errorMessage = 'Đăng Ký Thành Công';
        this.classResponse = 'text-success';
      }
      else{
        this.errorMessage = 'Tài Khoản Tồn Tại';
        this.classResponse = 'text-danger';
      }
    })
    .catch(error => console.log(error));
    console.log(this.formSignUp.value);
  }

  handleLoad(){
    
  }
}
