export class MFilesInput{
    WebAddress: string;
    UserId: string;
    Password: string;
    VaultId: string;
    Token: string;
    VaultToken: string;
    ObjectId: number;
    ClassId: number;
    Method: number;
    Properties: PropertyVal[];

    constructor(){
        this.WebAddress = '';
        this.UserId = '';
        this.Password = '';
        this.VaultId = '';
        this.Token = '';
        this.VaultToken = '';
        this.ObjectId = -1;
        this.ClassId = -1;
        this.Method = 0;
        this.Properties = [];
    }
}

export class PropertyVal{
    propertyDatatype: string;
    propertyID: number;
    propertyName: string;

    constructor(){
        this.propertyDatatype = '';
        this.propertyID = -1;
        this.propertyName = '';
    }
}

export class StringKeyValueTemplate{
    Id: string;
    Name: string;
}

export class NumberKeyValueTemplate{
    Id: number;
    Name: string;
}