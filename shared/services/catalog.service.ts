import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'

import { API } from '../models/constants/const-api';
import { InpCatalog } from '../models/catalog/inp-catalog';
import { CategoryDataCrud } from "../models/catalog/category-data-crud";
import {CategoryItemValue} from '../models/catalog/category-item-value';
import { Formula } from "../models/formula";
import { Accumulate } from "../models/accumulate";
import { CatalogOutputNew} from '../../shared/models/catalog/catalog-outputNew';
import{CatalogValue} from '../../shared/models/catalog/CatalogValues';
import { cpypaste } from '../models/catalog/cpypaste';
import { CDTOTreeItm } from '../models/item';
import { MFilesInput } from '../models/mfiles';
import { Excel } from '../models/excel/excel';

@Injectable()
export class CatalogService {

    private apiUrl: string;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){
        this.apiUrl = 'api/Catalog';  // URL to web api
    }

    getDiagramNew(projectId: number, url: string): Observable<any>{
        return this.http.get(url + 'api/ExportCategory' + "/GetDiagram/" + projectId).map(response => response.json());
    }

    putCatalog(Test:CatalogValue[] ,url: string){
        let bodyString = JSON.stringify(Test); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

 
        return this.http.put(url +'api/CatagoryExport/Insert', bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    getDiagram(projectId: number, url: string): Observable<any>{
        console.log(url + this.apiUrl + "/GetDiagram/" + projectId);
        return this.http.get(url + this.apiUrl + "/GetDiagram/" + projectId).map(response => response.json());
    }

    getAnalysis(projectId: number, url: string): Observable<any>{
        return this.http.get(url + this.apiUrl + "/GetAnalysis/" + projectId).map(response => response.json());
    }

    getData(categoryId: number,len:number, url: string): Observable<any>{
      // url = 'http://localhost:62377/';
        return this.http.get(url + this.apiUrl + "/GetCategoryData/" + categoryId+"/"+len).map(response => response.json());
    }

    getAttributes(categoryId: number, url: string): Observable<any>{
        return this.http.get(url + "api/Attributes" + "/GetByModel/" + categoryId + "/0").map(response => response.json());
    }

    getCalculationData(modelId: number, type: number, url: string): Observable<any>{
        return this.http.get(url + this.apiUrl + "/GetCalculationDataByModel/" + modelId + "/" + type).map(response => response.json());
    }

    getCategoryByModel(modelId: number, type: number, url: string): Observable<any>{
        return this.http.get(url + this.apiUrl + "/GetCategoryByModel/" + modelId + "/" + type).map(response => response.json());
    }

    getPath(id: number, type: number, url: string): Observable<any>{
        return this.http.get(url + this.apiUrl + "/GetPath/" + id + "/" + type).map(response => response.json());
    }

    putDiagram(inpCatalog: InpCatalog, url: string): Observable<any> {
        let bodyString = JSON.stringify(inpCatalog); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

     
        return this.http.put(url + this.apiUrl, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    putData(inpCategory: CategoryDataCrud, url: string): Observable<any> {
        let bodyString = JSON.stringify(inpCategory); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(url + "api/Data", bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    putImport(inpExcel: Excel, url: string): Observable<any> {
    //  url='http://localhost:62377/'
        let bodyString = JSON.stringify(inpExcel); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

  console.log(bodyString);
        return this.http.put(url + "api/Excel", bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    postImport(inpExcel: Excel, url: string): Observable<any> {
     
        let bodyString = JSON.stringify(inpExcel); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option


        return this.http.post(url + "api/Excel", bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    putAttrs(inpCategory: CategoryItemValue, url: string): Observable<any> {
      
        let bodyString = JSON.stringify(inpCategory); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

  
        return this.http.put(url + "api/Attributes", bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    putAttrsTree(inpCategory: CategoryItemValue, url: string): Observable<any> {
      
        let bodyString = JSON.stringify(inpCategory); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

  
        return this.http.put(url + "api/AttributesTree", bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    putItmTree(inpCategory: CDTOTreeItm[], url: string): Observable<any> {
        //url="http://localhost:62377/";
        let bodyString = JSON.stringify(inpCategory); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

  
        return this.http.post(url + "api/AttributesTree", bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }


    putCopy(inpCategory: cpypaste, url: string): Observable<any> {
       // url="http://localhost:62377/";
          let bodyString = JSON.stringify(inpCategory); // Stringify payload
          let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
          let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option
  
      
          return this.http.post(url + "api/CatalogCpyPaste", bodyString, options) // ...using put request
                           .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                           .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
      }

    deleteDiagram(inpCatalog: InpCatalog, url: string): Observable<any> {
      
        let bodyString = JSON.stringify(inpCatalog); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

   
        return this.http.put(url + this.apiUrl + "/delete", bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    formulaPost(formula: Formula, url: string): Observable<any> {
      
        let bodyString = JSON.stringify(formula); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option


        return this.http.put(url + "api/Formula", bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    accumulatePost(accumulate: Accumulate, url: string): Observable<any> {
      
        let bodyString = JSON.stringify(accumulate); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url + "api/Formula", bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }



    /* mfiles */

    getMfilesOutput(mfilesInput: MFilesInput, url: string): Observable<any> {
      
        let bodyString   = JSON.stringify(mfilesInput); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options      = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(url + "api/Mfiles", bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }
}