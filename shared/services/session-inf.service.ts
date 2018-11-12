import { SessionInf } from '../models/constants/session-inf';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';

export class SessionInfService {


  mSession: SessionInf;
  mStorageName: string = 'session-inf'; 

  constructor() {

    if(localStorage.getItem('session-inf')){
      this.mSession = JSON.parse(localStorage.getItem(this.mStorageName)) as SessionInf;
    }
    else{
      this.mSession = new SessionInf();
    }
   
  }
  SetData() {

  

  }
  
  GetSessionInfo(): SessionInf {
    return this.mSession;
  }

  DestroySessionInfo() {
    localStorage.clear();
  }

  SetSessionIsModified(isModified) {
    this.mSession.isModified = isModified;;
  }

  SetUser(id, name,password, isAdmin, UIP){
    debugger;
    this.mSession.userId = id;
    this.mSession.userName = name;
    this.mSession.password = password;
    this.mSession.isAdmin = isAdmin;
    this.mSession.uip = UIP;
    localStorage.setItem(this.mStorageName, JSON.stringify(this.mSession));
  }

  SetProject(id, name){
    this.mSession.projectId = id;
    this.mSession.projectName = name;

    localStorage.setItem(this.mStorageName, JSON.stringify(this.mSession));
  }

  SetConfig(url, modelid){
    this.mSession.url = url;
    this.mSession.modelid = modelid;

    localStorage.setItem(this.mStorageName, JSON.stringify(this.mSession));
  }
  Setdata(url, modelid,apiurl,webservice){
    debugger;
    this.mSession.url = url;
    this.mSession.modelid = modelid;
    this.mSession.apiurl = apiurl;
    this.mSession.webservice = webservice;
    
    localStorage.setItem(this.mStorageName, JSON.stringify(this.mSession));
  }
  SetSettings(settings){
    this.mSession.url = settings.url;
    this.mSession.modelid = settings.model_id;
    this.mSession.objectid = settings.object_id;
    this.mSession.apiurl = settings.apiurl;
    this.mSession.webservice = settings.webservice;
    this.mSession.view_id = settings.view_id;
    this.mSession.strg = settings.strg;
    localStorage.setItem(this.mStorageName, JSON.stringify(this.mSession));
}
  
}