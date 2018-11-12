import { SessionInfService } from "../services/session-inf.service";
import { SessionInf } from "../models/constants/session-inf";
import { LicenseManager } from "ag-grid-enterprise/main";
import { ToasterConfig } from "angular2-toaster";

export class BaseSharedComponent{

    public baseSession = () => {
        return this.mSessionService.GetSessionInfo();
    }
    public mSessionService: SessionInfService

    public toastConfig = new ToasterConfig({
        positionClass: 'toast-top-right',
        timeout: 5000,
        newestOnTop: true,
        tapToDismiss: true,
        preventDuplicates: false,
        animation: 'slideDown',
        limit: 5,
    });

    public toastTypes: string[] = ['default', 'info', 'success', 'warning', 'error'];

    constructor(){
        this.mSessionService = new SessionInfService();

        LicenseManager.setLicenseKey("IYCON_FZ_LLC_Wizly_2Devs8_May_2019__MTU1NzI3MDAwMDAwMA==0bdb706d41ebf8585a489f8bed7ed20b");
    }

    autoSize(ignore, columnDefs, gridOptions): void {
      if(!gridOptions){
        return;
      }

      let allColumnIds = [];
      columnDefs.forEach((columnDef) => {
        if(ignore.indexOf(columnDef['field']) == -1){
          allColumnIds.push(columnDef.field);
        }
      });
      gridOptions.columnApi.autoSizeColumns(allColumnIds);
    }

    fitSize(gridOptions) {

        if (!gridOptions) {
            return;
        }

        gridOptions.api.sizeColumnsToFit();
    }

    /*
        iAction: 1 - Read, 2 - Read/Write, 3 - Read/Write/Delete
    */
    public IsAccessible(iAction:number): boolean{

        let accessType = +localStorage.getItem('AccessType');
        
        if(iAction <= accessType){
            return true;    
        }

        return false;
    }

    public GetAccess(){
        let access = +localStorage.getItem('AccessType');

        if(access){
            if(access == 1){
                return '[Read-Only]';
            }
            else if(access == 2){
                return '[Read, Write]';
            }
            else if(access == 3){
                return '[Read, Write, Delete]';
            }
            else{
                return '';
            }
        }
        else{
            return '';
        }
    }


    /*
        For binary
    */

    public extractValues(mappings) {
        return Object.keys(mappings);
    }

    public lookupValue(mappings, key) {
        return mappings[key];
    }

    public lookupKey(mappings, name) {
        for (var key in mappings) {
            if (mappings.hasOwnProperty(key)) {
                if (name === mappings[key]) {
                    return key;
                }
            }
        }
    }
}