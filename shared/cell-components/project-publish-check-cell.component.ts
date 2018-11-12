import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { IAfterGuiAttachedParams } from 'ag-grid';

@Component({
  selector: 'project-publish-check-cell',
  template: `
      <input type="checkbox" [(ngModel)]="checked" (ngModelChange)="invokeMethod($event)" /> 
  `,
  styles: [
    `
    
    `
  ]
})
export class ProjectPublishCheckCellComponent implements ICellRendererAngularComp {

  public params: any;
  private checked: boolean = false;

  refresh(params: any): boolean {
    return true;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {

  }

  agInit(params: any): void {
    this.params = params;
    this.checked = this.params.value === true;
  }

  invokeMethod(checked: boolean) {
    this.checked = checked;
    this.params.node.setDataValue(this.params.colDef, (this.checked ? true : false));
  }

}