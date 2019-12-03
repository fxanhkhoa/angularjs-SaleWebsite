import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor() { 
    if (localStorage.getItem("isLoggedIn") == "true"){
      this.loggedIn.next(true);
    }
    else{
      this.loggedIn.next(false);
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  setLogin(islogin: boolean){
    this.loggedIn.next(islogin);
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  } 
}
