import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { IAfterGuiAttachedParams } from 'ag-grid';

@Component({
    selector: 'check-cell',
    template: `
    <div style="height:100%;width:100%;display:flex;">
        <label class="custom-control custom-radio">
            <input type="radio" class="custom-control-input" name="customRadio" 
                   (ngModel)="checked" [checked]="checked" (click)="onChange($event)">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description"></span>
        </label>
    </div>
        <!--mat-radio-button class="radio1" value="ProjectName" (ngModel)="checked" [checked]="checked" (click)="onChange($event)"></mat-radio-button-->
  `,
    styles: [`
        .custom-radio{
            margin-top:auto;
            margin-bottom:auto;
        }
    `]
})
export class ProjectSelectCellComponent implements ICellRendererAngularComp {

    public params: any;
    private checked: boolean = false;

    refresh(params: any): boolean {
        return true;
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {

    }

    agInit(params: any): void {
        this.params = params;
        this.checked = this.params.value == true;
    }


    onChange(checked: boolean) {
        this.checked = true;
        if (checked == false) {
            this.checked = false;
            this.params.context.componentParent.methodfromparent2(`${this.params.node.data.ID}`)
        }
        else {
            this.params.node.setDataValue(this.params.colDef, (this.checked ? true : false));
            this.params.context.componentParent.methodfromparent1(`${this.params.node.data.ID}`);
            this.params.context.componentParent.setSelectedProject(`${this.params.node.data.ID}`, `${this.params.node.data.Name}`);
        }
    }
}