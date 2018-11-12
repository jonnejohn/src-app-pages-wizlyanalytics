import { itemAttrVal1 } from './itemAttrVal.1';

export class Items {
    ID: string;
    Name: string;
    attrval: itemAttrVal1[];
}

export class CatItems {
    UserID:number
    ID: number;
    Name: string;
    value: Items[];
}

export class AllItems {
    value: Items[];
}


export class CDTOTreeMdlItems {
    ID: string;
    Name: string;
    attrval: itemAttrVal1[];
    childItm: CDTOTreeMdlItems[];
    Isparent: boolean;
}

export class TreeMdlCalc {
    ID: string;
    attrval: itemAttrVal1[];
}

export class EdtTreeItm{
    ParntID:number;
    ChildID:number;
    isRemove:boolean;
    UserID:number;
    TID:number;
    CategID:number;
}

export class LstEdtTreeItm
{
    lstItms:EdtTreeItm[];
}

export class CDTOTreeItm{
        CategoryID :number;
		ItmName :string;
		isAdd :boolean;
		UserID :number;
}