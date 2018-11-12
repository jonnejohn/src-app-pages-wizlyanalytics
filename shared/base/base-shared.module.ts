import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AgGridModule } from "ag-grid-angular";
import { ProjectPublishCheckCellComponent } from '../cell-components/project-publish-check-cell.component';
import { SessionInfService } from '../services/session-inf.service';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule.withComponents(
      [
        
      ]
    ),
    ToasterModule.forRoot()
  ],
  declarations: [
    
  ],
  exports: [
    ToasterModule
  ],
  providers: [
    SessionInfService
  ]
})
export class BaseSharedModule { }
