import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class SignUpService{
    constructor(private http: Http){}

    sendPost(value){
        const url = 'http://localhost:4200/signup';
        const headers = new Headers({ 'Content-Type' : 'application/json' });
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers })
        .toPromise()
        .then(res => res.json());
        }
}