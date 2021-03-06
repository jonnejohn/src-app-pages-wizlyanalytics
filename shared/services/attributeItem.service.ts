import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'

import { API } from '../models/constants/const-api';

import { AttributeItem } from '../models/attribute';//needs to be changed to content from dto class



import { Attr } from '../models/Attr';

import { AttrProj } from '../models/AttrProj';

import { GroupAttrAdd } from '../models/AttrGroupAdd';
import { Attributes } from '../models/attributes';

@Injectable()
export class AttributeItemService {
    private hostApi : string;
    private hostURl : string;
    //private hostApi = 'http://localhost/AferspyreUiApi/api/Hosts';  // URL to web api
    //private hostApi = 'http://qprdemo2.iycon.net/AfterspyreDataApi/api/attributeItems';
    //private hostApi = 'http://localhost/AfterspyreDataApi/api/attributeItems'; 
    private headers = new Headers({'Content-Type': 'application/json'});

    hosts:AttributeItem[]; //will be changed acc to line 10 class

    constructor(private http: Http){
       this.hostApi ='api/attributeItems';
       this.hostURl = 'api/Attributes';
    }

    getHosts(url:string): Observable<any>{
        return this.http.get(url+this.hostApi).map(response => response.json());
    }

    getGrpAttributes(grpID : number,hosturl:string): Observable<any>{
        var url = this.hostApi + "/update/" + grpID;
        return this.http.get(hosturl+url).map(response => response.json());
    }

     getGrpAttrItm(grpID : number,hosturl:string): Observable<any>{
        var url = this.hostApi + "/GrpItm/" + grpID;
        return this.http.get(hosturl+url).map(response => response.json());
    }

    getCategAttributes(projectId:number,userId:number,categID : number,hosturl:string): Observable<any>{
        var url = this.hostApi + "/getItems/"  +projectId + "/"+ userId + "/" + categID;
        return this.http.get(hosturl+url).map(response => response.json());
    }

    getGroupAttributes(projectId:number,userId:number,hosturl:string): Observable<any>{
        var url = this.hostApi+"/" +projectId + "/"+ userId;
        return this.http.get(hosturl+url).map(response => response.json());
    }

    getAttributes(categID : number,hosturl:string): Observable<any>{
        var url = this.hostApi + "/" + categID;
        return this.http.get(hosturl+url).map(response => response.json());
    }

//Create and Update method
    postHosts(hosts: Attributes[],hosturl:string): Observable<any> {
        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(hosturl+this.hostApi, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    //Create and Update method
    postImp(hosts: AttrProj[],hosturl:string): Observable<any> {
        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(hosturl+this.hostApi, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

      //Create and Update method
      postVal(hosts: Attr,url:string): Observable<any> {
        
        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url+this.hostURl, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

//delete methods
    deleteHosts(hosts: Attr[],hosturl:string): Observable<any> {
        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Delete, headers: headers }); // Create a request option

        return this.http.put(hosturl+this.hostApi, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }
//not using
    update(host: AttributeItem): Observable<any> {
      const url = this.hostApi + "/" + host.ID + "?" + "name=" + host.Name 
      //return this.http
      //  .put(url, JSON.stringify(host), {headers: this.headers})
      //  .toPromise()
      //  .then(() => host)
      //  .catch(this.handleError);


        let bodyString = JSON.stringify(host); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(this.hostApi + "/" + `${host.ID}`, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}