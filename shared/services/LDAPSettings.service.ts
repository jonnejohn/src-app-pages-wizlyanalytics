import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'

//import { Host } from '../models/host';//needs to be changed to content from dto class
import {LDAPSettings} from '../models/LDAPSettings';
import { API } from '../models/constants/const-api';
import {SMTPEmail} from '../models/SMTPEmail';

@Injectable()
export class LDAPSettingsService {

    apiUrl4: string;
    apiUrl3: string;
    apiUrl1: string;
    private apiUrl: string;
    private headers = new Headers({'Content-Type': 'application/json'});

 //   hosts:Host[]; //will be changed acc to line 10 class
LDAPSettings:LDAPSettings[];

    constructor(private http: Http){
       this.apiUrl = 'api/iniSettings';  // URL to web api
       this.apiUrl1 = 'api/SMTPEmail';
     // this.apiUrl='http://localhost/publish/api/iniSettings';
}

    get(url:string): Observable<any>{
       
       // url='http://localhost:16642/api/iniSettings'    
        return this.http.get(this.apiUrl3).map(response => response.json());
      

    }

    get2(uiapiurl:string): Observable<any>{
       
        // url='http://localhost:16642/api/iniSettings'    
         return this.http.get(uiapiurl + 'api/iniSettings').map(response => response.json());
       
 
     }

    getMigration(url:string){
        
        //url='http://localhost:62377/'
        this.apiUrl4='api/Conversion';
        return this.http.get(url+this.apiUrl4).map(response => response.json());
    }


//Create and Update method
    postProject(hosts: LDAPSettings[],url:string): Observable<any> {
        let bodyString = JSON.stringify(hosts); // Stringify payload
     
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option
        //this.apiUrl3='http://localhost:16642/api/iniSettings';
     return this.http.post(this.apiUrl3, bodyString, options) // ...using put request
     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }


    getSource(): void{
        
          this.http.get('./config.json')
              .map(response => response.json())
              .subscribe(settings => {
                  
                this.apiUrl3=settings.uiApiUrl + 'api/iniSettings';
              });
      }

    postSMTP(projects: SMTPEmail,url:string): Observable<any> {
     //   debugger;
       // url='http://localhost:62377/'
        let bodyString = JSON.stringify(projects); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url+this.apiUrl1, bodyString, options) // ...using put request
     // return this.http.post(this.apiUrl, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }



    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}