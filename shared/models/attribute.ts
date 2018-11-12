export class AttributeItem{
    ID:number;
    Name:string;
    DataType:number; // 2 - Number, 4 - String, 5 - Enumeration, 9 - Currency, 10 - Binary, 11 - Date, 14 - Memo, 15 - HyperLink, 17 - FileName, 18 - Model, 19 - Integer
    EnumGrpID:number;
}

export class AllAttributeItem{
    ModelID:number;
    CatID:number;
    ModelName:string;
   All:AttributeItem[];
}