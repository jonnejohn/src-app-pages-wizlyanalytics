export class User {
 
    ID:number;
    Username: string;
    Password:string;
    Fullname:string;
    Email:string;
    Contact:string;
    Description:string;
    IsDelete:boolean;
    CreateDate:string;
    UserID:number;
    IsADUser:boolean;
    IsLicensed:boolean;

    constructor(){
        this.ID = 0;
        this.Username = '';
        this.Password = '';
        this.Fullname = '';
        this.Email = '';
        this.Contact = '';
        this.Description = '';
        this.IsDelete = false;
        this.IsADUser=false;
        this.IsADUser=false;
        this.IsLicensed=false;
        
    }

}

export class User1 {
    id:number;
    name:string;
    email:string;
}