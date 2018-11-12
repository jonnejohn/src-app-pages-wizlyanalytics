import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { IAfterGuiAttachedParams } from 'ag-grid';

@Component({
    selector: 'project-publish-button-cell',
    template: `
        <button class="btn btn-sm"
                *ngIf="params.node.data.access == 3" (click)="invokeParentMethod()">
                <i class="fa fa-share fa-sm blue"></i>
        </button>`
    ,
    styles: [``]
})
export class ProjectPublishButtonCellComponent implements ICellRendererAngularComp {

    public radioModel: boolean = false;
    public params: any;

    refresh(params: any): boolean {
        return true;
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {

    }

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
        this.params.context.componentParent.PublishTo(this.params.node, `${this.params.node.data.ID}`)
    }
}
