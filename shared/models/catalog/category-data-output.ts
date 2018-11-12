import {CategoryAttribute} from './category-attribute';
import {CategoryItemValue} from './category-item-value';

export class CategoryDataOutput{
  Attributes: CategoryAttribute[];
  ItemValues: CategoryItemValue[];
  JsonString: string;
  categoryID:number;
}