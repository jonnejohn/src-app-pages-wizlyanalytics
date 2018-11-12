import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'

import { API } from '../models/constants/const-api';

import { EnumGrp } from '../models/EnumGrp';
import { EnumGroup } from '../models/Enumgroup';


@Injectable()
export class EnumGrpService {
    private hostApi : string;
    private hostUrl : string;
    private enumUrl:string;
    //private hostApi = 'http://localhost/AferspyreUiApi/api/Hosts';  // URL to web api
    //private hostApi = 'http://qprdemo2.iycon.net/AfterspyreDataApi/api/attributeItems';
    //private hostApi = 'http://localhost/AfterspyreDataApi/api/enumgroup';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    hosts: EnumGroup[]; //will be changed acc to line 10 class

    constructor(private http: Http) {
        this.hostApi = 'api/enumgroup';
        this.hostUrl = 'api/enumgrp';
        this.enumUrl = 'api/Enum';
    }

    getHosts(url:string): Observable<any> {
        return this.http.get(url+this.hostApi).map(response => response.json());
    }

    getEnumItems(hosturl:string): Observable<any> {
        return this.http.get(hosturl+this.hostUrl).map(response => response.json());
    }

    getCategAttributes(projectId:number,userId:number,catID:number,hosturl:string): Observable<any>{
        var url = this.hostApi + "/getItems" + "/" + projectId + "/"+ userId + "/" + catID ;
        return this.http.get(hosturl+url).map(response => response.json());
    }

    //Create and Update method
    postAttrItm(hosts: EnumGroup,url:string): Observable<any> {
        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url+this.hostApi, bodyString, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }


    //Create and Update method
    postHosts(hosts: EnumGroup,url:string): Observable<any> {
        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(url+this.hostApi, bodyString, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

     //Create and Update method
     postEnum(hosts: EnumGroup,url:string): Observable<any> {
       //  url = 'http://localhost:62377/';
        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(url+this.enumUrl, bodyString, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    //delete methods
    deleteHosts(hosts: EnumGroup,url:string): Observable<any> {
        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Delete, headers: headers }); // Create a request option

        return this.http.put(url+this.hostApi, bodyString, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    

    deleteItems(hosts: EnumGroup,hosturl:string): Observable<any> {
      //  var url = 'http://localhost/AfterspyreDataApi/' + 'api/enumGrp';
        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Delete, headers: headers }); // Create a request option

        return this.http.put(hosturl+this.hostApi, bodyString, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }
    //not using
    update(host: EnumGroup): Observable<any> {
        const url = this.hostApi + "/" + host.ID + "?" + "name=" + host.Name
        //return this.http
        //  .put(url, JSON.stringify(host), {headers: this.headers})
        //  .toPromise()
        //  .then(() => host)
        //  .catch(this.handleError);


        let bodyString = JSON.stringify(host); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(this.hostApi + "/" + `${host.ID}`, bodyString, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}