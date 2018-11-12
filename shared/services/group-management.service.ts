import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'

import { ModelTemplateL } from '../models/modeltemp';//needs to be changed to content from dto class

import { API } from '../models/constants/const-api';
import { Group, GroupAssignment, GroupPermission, GroupProject } from "../models/usermanagement/group";


@Injectable()
export class GroupManagementService {
    private apiUrl : string;
    private headers = new Headers({'Content-Type': 'application/json'});
    
    hosts:ModelTemplateL[]; //will be changed acc to line 10 class
    
    constructor(private http: Http){
        this.apiUrl ='api/GroupManagement';
       // this.apiUrl ='http://localhost/publish/api/GroupManagement';

    }

    deleteGroup(user: Group[], url:string){
       // var url="http://localhost:62377/";
         let bodyString = JSON.stringify(user); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(url+this.apiUrl, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }


    getGroupModules(iGroupId: number, url:string): Observable<any>{
        return this.http.get(url+'api/GroupAssignment'+ '/GetGroupModules/' + iGroupId).map(response => response.json());
    }

    getGroups(url:string): Observable<any>{
        return this.http.get(url+this.apiUrl).map(response => response.json());
    }

    getGroupsPublish(iProject:number, url:string): Observable<any>{
   
        return this.http.get(url+this.apiUrl + '/GetPublish/' + iProject).map(response => response.json());
    }

    getAssignedUsers(iGroupId: number, url:string): Observable<any>{
       // url="http://localhost:62377/";
        return this.http.get(url+this.apiUrl + '/GetUsers/' + iGroupId).map(response => response.json());
    }

    getAssignedProjects(iGroupId: number, url:string): Observable<any>{
        return this.http.get(url+'api/GroupProject' + '/GetProjects/' + iGroupId).map(response => response.json());
    }

    getNonUsers(iGroupId: number, url:string): Observable<any>{
        return this.http.get(url+this.apiUrl + '/GetNonUsers/' + iGroupId).map(response => response.json());
    }

    getNonProjects(iGroupId: number, url:string): Observable<any>{
        return this.http.get(url+'api/GroupProject' + '/GetNonProjects/' + iGroupId).map(response => response.json());
    }

  /*  getUserModules(iUserId: string, url:string): Observable<any>{
        
        return this.http.get(url+this.apiUrl  + '/GetUserModules/' + iUserId).map(response => response.json());
    }
*/

     getUserModules(iUserId: number, url:string): Observable<any>{
        
        return this.http.get(url+this.apiUrl  + '/GetUserModules/' + iUserId).map(response => response.json());
      //  return this.http.get(this.apiUrl  + '/GetUserModules/' + iUserId).map(response => response.json());
    }

    postGroup(user: Group, url:string): Observable<any> {
      
        let bodyString = JSON.stringify(user); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url+this.apiUrl, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    postGroupAll(user: Group[], url:string): Observable<any> {
      //  var url='http://localhost:62377/';
      var apiurl='api/GroupManagement/Save';
        let bodyString = JSON.stringify(user); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url+apiurl, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    postGroupPublish(project: number, groups: number[], url:string): Observable<any> {
      //  var url='http://localhost:62377/';
      var apiurl='api/GroupManagement/Publish';
        let bodyString = JSON.stringify(groups); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url+ apiurl + '/' + project, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    getAccess(iUser: number, iProject:number, url:string): Observable<any> {

        return this.http.get(url+this.apiUrl  + '/GetAccess/' + iUser + '/' + iProject).map(response => response.json());

    }

    putGroup(user: Group, url:string): Observable<any> {
      
        let bodyString = JSON.stringify(user); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(url+this.apiUrl , bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    postGroupAssignment(assignment: GroupAssignment, url:string): Observable<any> {
      
        let bodyString = JSON.stringify(assignment); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url+ 'api/GroupAssignment', bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    postGroupProject(assignment: GroupProject, url:string): Observable<any> {
      
        let bodyString = JSON.stringify(assignment); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url+ 'api/GroupProject', bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    putGroupPermission(permission: GroupPermission, url:string): Observable<any> {
      
        let bodyString = JSON.stringify(permission); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(url+ 'api/GroupAssignment', bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }
}