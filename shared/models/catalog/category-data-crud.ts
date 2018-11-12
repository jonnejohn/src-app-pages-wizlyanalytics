import {NewItem} from './new-item';
import {UpdateValue} from './update-value';
import {UpdateItem} from './update-item';

export class CategoryDataCrud{
  UserID:number;
  CategoryId: number;
  NewItems: NewItem[];
  UpdateItems: UpdateItem[];
  UpdateValues: UpdateValue[];
}