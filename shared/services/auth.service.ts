import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'

export class User {
  constructor(
    public id: number,
    public username: string,
    public name: string,
    public password: string) { }
}

var users = [
  new User(1, 'afterspyre', 'Afterspyre Demo User', 'afterspyre@2018'),
  new User(2, 'jude', 'jude', 'jude@123')
];

@Injectable()
export class AuthService {

  private apiUrl: string;
  private apiUrl1: string;

  constructor(private _router: Router, private http: Http) {
    this.apiUrl = 'api/Login1';
    // this.apiUrl = 'http://localhost/publish/api/Login1';
    //  this.apiUrl1='http://localhost/publish/api/GetUserID';
    this.apiUrl1 = 'api/GetUserID';
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("projectId");
    localStorage.removeItem("projectName");
    localStorage.removeItem("UserID");
    localStorage.removeItem("AccessType");
    
    localStorage.removeItem("config");
    localStorage.removeItem("modules");
    this._router.navigate(['/login']);
  }

  login(user,username: string, password: string,LDAPAuth:string,serveraddress:string, url) {
   
    /*this.getLogin(user.username, user.password, "").subscribe((res) => {
      if (res) {
        //API Call 

        var test = res;
        this.getUserID(user.username, user.password, "").subscribe((res) => {
          if (res) {

            localStorage.setItem("UserID", res);
          }
        });
        return res;
      }
    });*/

    //var authenticatedUser = users.find(u => u.username === user.username);
    //if (authenticatedUser && authenticatedUser.password === user.password){
    //  localStorage.setItem("user", authenticatedUser.name);
    //  this._router.navigate(['']);      
    //  return true;
    //}
    //  return false;

  }



  login1(user, check) {


    if (check == "Enter") {

      var authenticatedUser = users.find(u => u.username === user.username);
      if (authenticatedUser && authenticatedUser.password === user.password) {
        localStorage.setItem("user", authenticatedUser.name);

        this._router.navigate(['']);
        return true;
      }
      else {

        return false;
      }
      //      return true;


    }
    return true;
  }


  getLogin(username: string, password: string,LDAPAuth:string,serveraddress:string, url: string): Observable<any> {
    //url='http://localhost:62377/';
   console.log(url + this.apiUrl + "/" + username + "/" + password+ "/" + LDAPAuth+ "/" + serveraddress);
    return this.http.get(url + this.apiUrl + "/" + username + "/" + password+ "/" + LDAPAuth+ "/" + serveraddress)
      //  return this.http.get(this.apiUrl + "/" + username + "/" + password)
      .map((response) => response.json());
  }

  getUserID(username: string, password: string, url: string): Observable<any> {
    //url='http://localhost:62377/';
    return this.http.get(url + this.apiUrl1 + "/" + username + "/" + password)
      // return this.http.get(this.apiUrl1+ "/" + username + "/" + password)
      .map((response) => response.json());
  }

  checkCredentials() {

    if (localStorage.getItem("user") === null) {

      if (this._router.url === "/") {

        this._router.navigate(['login']);
      }
      else {
        this._router.navigate(['/login']);
      }

    }
  }


    TestUser(username: string, password: string, url: string): Observable<any> {
     // url='http://localhost:62377/';
      var apiUrl='api/TestCredentials';
    return this.http.get(url + apiUrl + "/" + username + "/" + password)
      //  return this.http.get(this.apiUrl + "/" + username + "/" + password)
      .map((response) => response.json());
  
  }
}