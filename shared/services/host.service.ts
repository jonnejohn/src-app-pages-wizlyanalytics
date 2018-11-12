import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, User } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/toPromise'

import { Host } from '../models/host';
import { UIAPI } from '../models/constants/const-api';
import { ResponseCode } from '../models/license';
import { error } from 'util';

@Injectable()

export class HostService {

    private apiUrl: string;
    private result: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    hosts: Host[];

    constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private _service: AuthService) {
        //this.apiUrl = UIAPI + 'api/Hosts';  // URL to web api

        let apiUrl = localStorage.getItem("apiUrl");
        if (apiUrl) {
            //this.apiUrl = (<any>data).uiApiUrl;
            this.apiUrl = apiUrl;
        }
    }

    getBookmarkSource() {

        var check;
        localStorage.removeItem("BookmarkMode");
        this.http.get('./config.json')
            .map(response => response.json())
            .subscribe(settings => {

                var flag = settings.Bookmark == undefined ? 1 : settings.Bookmark;
                localStorage.setItem("BookmarkMode", flag);
            });
        //  return check;
    }
    getSource(): void {


        localStorage.removeItem("apiUrl");
        this.http.get('./config.json')
            .map(response => response.json())
            .subscribe(settings => {
                localStorage.setItem("apiUrl", settings.uiApiUrl + 'api/Hosts');
                this.apiUrl = settings.uiApiUrl + 'api/Hosts';
            });
    }

    getHosts(): Observable<any> {
        return this.http.get(this.apiUrl).map(response => response.json());
    }

    getFirstHost(): Observable<Host> {

        if (this.apiUrl == undefined) {
            this.http.get('./config.json')
                .map(response => response.json())
                .subscribe(settings => {
                    localStorage.setItem("apiUrl", settings.uiApiUrl + 'api/Hosts');
                    this.apiUrl = settings.uiApiUrl + 'api/Hosts';

                    this.http.get(this.apiUrl).map(response => response.json())
                        .subscribe(runs => {

                        }, (err) => {
                            debugger;
                            localStorage.setItem("log", "log");
                            this._service.logout();
                        });

                    return this.http.get(this.apiUrl).map(response => response.json()[0]);
                });
        }
        else {
            this.http.get(this.apiUrl).map(response => response.json())
                .subscribe(runs => {

                }, (err) => {
                    debugger;
                    localStorage.setItem("log", "log");
                    this._service.logout();
                });

            return this.http.get(this.apiUrl).map(response => response.json()[0]);
        }
    }


    getConfig(): Observable<any> {
        //return this.http.get(UIAPI +this.apiUrl + '/GetConfig').map(response => response.json());
        return this.http.get(this.apiUrl + '/GetPageLicenses').map(response => response.json());
    }

    getWizConfig(): Observable<any> {
        //return this.http.get(UIAPI +this.apiUrl + '/GetConfig').map(response => response.json());
        return this.http.get(this.apiUrl + '/GetWizLicenses').map(response => response.json());
    }

    getLinks(): Observable<any> {
        //return this.http.get(UIAPI +this.apiUrl + '/GetConfig').map(response => response.json());
        return this.http.get(this.apiUrl + '/GetLinks').map(response => response.json());
    }

    getCheck(): Observable<any> {
        return this.http.get(this.apiUrl + '/Check').map(response => response.json());
    }

    postHosts(hosts: Host[]): Observable<any> {

        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.put(this.apiUrl, bodyString, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    deleteHosts(hosts: Host[]): Observable<any> {

        let bodyString = JSON.stringify(hosts); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Delete, headers: headers }); // Create a request option

        return this.http.put(this.apiUrl, bodyString, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    update(host: Host): Observable<any> {
        const url = this.apiUrl + "/" + host.Id + "?" + "name=" + host.Name + "&address=" + host.Address + "&order=" + host.Position
        //return this.http
        //  .put(url, JSON.stringify(host), {headers: this.headers})
        //  .toPromise()
        //  .then(() => host)
        //  .catch(this.handleError);


        let bodyString = JSON.stringify(host); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Put, headers: headers }); // Create a request option

        return this.http.put(this.apiUrl + "/" + `${host.Id}`, bodyString, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getCheckLicense(): Observable<any> {
        return this.http.get(this.apiUrl + '/CheckLicense').map(response => response.json());
    }

    getLicense(): Observable<any> {
        return this.http.get(this.apiUrl + '/GetLicense').map(response => response.json());
    }

    getLicenseCount(): Observable<any> {
        return this.http.get(this.apiUrl + '/GetMaxUser').map(response => response.json());
    }

    activate(code: string, password: string): Observable<any> {
        return this.http.get(this.apiUrl + '/ActivateOnline/' + code + '/' + password).map(response => response.json());
    }

    refresh(): Observable<any> {
        return this.http.get(this.apiUrl + '/RefreshLicense').map(response => response.json());
    }

    getRequestCode(code: string, password: string): Observable<any> {
        return this.http.get(this.apiUrl + '/GetRequestCode/' + code + '/' + password).map(response => response.json());
    }

    sendResponse(code: string): Observable<any> {
        return this.http.get(this.apiUrl + '/ManualActivate/' + code).map(response => response.json());
    }

    postActivate(respCode: ResponseCode): Observable<any> {

        let bodyString = JSON.stringify(respCode); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ method: RequestMethod.Post, headers: headers }); // Create a request option

        return this.http.post(this.apiUrl.replace('api/Hosts', 'api/Activation'), bodyString, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if 
    }
}