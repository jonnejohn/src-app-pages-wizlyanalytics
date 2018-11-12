import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SessionInfService } from '../services/session-inf.service';

 
@Injectable()
export class AuthGuard implements CanActivate {
 
    baseSession: any;
    constructor(private router: Router) { }
 
    //canActivate() {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("idhar login check kiya");
       let analyticsSession: SessionInfService = new SessionInfService();
        console.log(analyticsSession.GetSessionInfo());
       
       if(analyticsSession.GetSessionInfo().userId == 0){
           console.log("check");
          // this.router.navigate(['pages/demo/'+this.baseSession().modelid+'-0']);
           this.router.navigate(['/auth/signin']);
           return false;//ye false bhej k kya fayda h? kidhar use ho ra h?
       }
       else{
           
           return true;
       }
       
    }
}