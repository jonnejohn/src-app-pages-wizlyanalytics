export class Group {
 
    ID:string;
    Name: string;
    Description:string;
    CreatedBy : string;
    IsDelete: boolean;
    UserID:number;
    Created:string;
    AccessType:number;
    IsIncluded:boolean;
}

export class GroupAssignment{
    ID: number;
    IsAdd: boolean;
    UserIds: number[];

    constructor(){
        this.ID = 0;
        this.IsAdd = false;
        this.UserIds = []; 
    }
}

export class GroupProject{
    ID: number;
    IsAdd: boolean;
    ProjectIds: number[];

    constructor(){
        this.ID = 0;
        this.IsAdd = false;
        this.ProjectIds = []; 
    }
}


export class GroupPermission{
    ID: number;
    ModuleIds: number[];

    constructor(){
        this.ID = 0;
        this.ModuleIds = []; 
    }
}