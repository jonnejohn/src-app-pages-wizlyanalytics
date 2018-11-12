export class SessionInf{

  username: string;
  uip: any;
  webservice: any;
  apiurl: any;
  uiApiUrl: string;
  dataApiUrl: string;
  password:string;
  userId: any;
  userName: string;
  isAdmin: boolean;
  
  projectId: number;
  projectName: string;

  isModified: boolean;

  url: any;
  modelid:string;
  objectid:string;
  view_id:any;
  strg:any;
  constructor (){

    this.uiApiUrl = 'http://192.168.0.20/WizlyApi/';
    this.dataApiUrl = 'http://192.168.0.20/WizlyDataApi/';

    this.userId = 0;
    this.userName = '';
    this.isAdmin = false;
    this.projectId = 0;
    this.projectName = '';
    this.uip='';
    this.isModified = false;
    this.url = '';
    this.modelid = '';
    this.objectid ='';
    this.webservice ='';
    this.view_id = '';
    this.strg = '';
  }
}