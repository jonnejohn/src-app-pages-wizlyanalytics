export class ModelTemplate {
  ID: number;
  Name: string;
level:number;
  // 1 - list
  // 2 - matrix
  // 3 - tree
  // 4 - net
  // 5 - flow
  Type: number;
  CategoryID:number;
  Selected: boolean;
}

export class ModelGroupTemplate {
  Models: ModelTemplate[];
  Group: string;
  GroupID: string;
}