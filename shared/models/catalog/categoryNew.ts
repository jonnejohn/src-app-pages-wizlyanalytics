import {CategoryDataOutput} from './category-data-output';
export class NewCategory{
  ID: number;
  Name: string;
  SubCategories: NewCategory[];
  CategoryData:CategoryDataOutput;
	
}
