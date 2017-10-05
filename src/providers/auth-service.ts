import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


let apiUrl = 'http://localhost:8000/oauth/';
let api = 'http://localhost:8000/posts/show';
let apiCredentials = 'http://localhost:8000/api/clients';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Teste de provider');
  }

  postData(credentials, type){

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl+type, credentials, {headers: headers}).
      subscribe(result =>{
        resolve(result.json());
      }, (err) =>{
        reject(err);
      });

    });
  
  }
  getClient(){
	  const data = JSON.parse(localStorage.getItem('userData'));
	 // console.log(data);
  return new Promise((resolve, reject) =>{
      let header = new Headers();
	  header.append('Accept', 'application/json');
      header.append('Authorization', 'Bearer ' + data);
      return this.http.get('http://localhost:8000/api/users', {headers: header}).
	   subscribe(result =>{
        resolve(result.json());
      }, (err) =>{
        reject(err);
      });

    });
  }
  

}
