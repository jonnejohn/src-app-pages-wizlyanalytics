import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'

//import { Host } from '../models/host';//needs to be changed to content from dto class
import {project} from '../models/project';
import { API } from '../models/constants/const-api';


@Injectable()
export class ProjectService {

    private apiUrl: string;
    private headers = new Headers({'Content-Type': 'application/json'});

 //   hosts:Host[]; //will be changed acc to line 10 class
projects:project[];

    constructor(private http: Http){
       this.apiUrl = 'api/Project';  // URL to web api
    //  this.apiUrl='http://localhost/publish/api/Project';
}

    getProject(UserID :number,url:string): Observable<any>{
        
      // this.apiUrl+= "/" + UserID;
       this.apiUrl = 'api/Project';
     //  return this.http.get(this.apiUrl).map(response => response.json());
         return this.http.get(url+this.apiUrl+"/" + UserID).map(response => response.json());
    }

//Create and Update method
    postProject(projects: project[],url:string): Observable<any> {
    //  console.log(projects);
   
   this.apiUrl='api/Project';
   //this.apiUrl='http://localhost/publish/api/Project';
        let bodyString = JSON.stringify(projects); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url+this.apiUrl, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }



//delete methods
    deleteProject(projects: project[],url:string): Observable<any> {
      
        let bodyString = JSON.stringify(projects); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Delete, headers: headers }); // Create a request option
        this.apiUrl='api/Project';
       // this.apiUrl='http://localhost/publish/api/Project';
        return this.http.put(url+this.apiUrl,bodyString,options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }
//not using


    update(project: project): Observable<any> {
        
//      const url = this.hostApi + "/" + host.Id + "?" + "name=" + host.Name + "&address=" + host.Address + "&order=" + host.Position
      const url = this.apiUrl + "/" + project.ID + "?" + "name=" + project.Name + "&userID=" + project.UserID 

      //return this.http
      //  .put(url, JSON.stringify(host), {headers: this.headers})
      //  .toPromise()
      //  .then(() => host)
      //  .catch(this.handleError);


        let bodyString = JSON.stringify(project); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(this.apiUrl + "/" + `${project.ID}`, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}