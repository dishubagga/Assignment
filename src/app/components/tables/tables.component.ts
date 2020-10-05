import { Component, OnInit, ViewChild } from '@angular/core';
import { GetEmployeeDataService } from '../../services/get-employee-data.service';
import { Subscription } from 'rxjs';
import { EmployeeModel } from '../../models/employee.model';
import { TranslateService } from '@ngx-translate/core';
import { SocketService } from '../../services/socket.service';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss', './tables.component.css']
})

export class TablesComponent implements OnInit {

  private _sub: Subscription;
  private _clientTranslation: Subscription;
  private _socketSubscription: Subscription;

  @ViewChild('agGrid') agGrid: AgGridAngular;

  rowData: EmployeeModel[] = [];
  firstName: string;
  columnDefs = [];


  constructor(private service: GetEmployeeDataService, private translate: TranslateService, private socketService: SocketService) {
    this.translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.setLanguage();
    // this.getEmployeeData();
    this.getDataFromSockets();
  }


  private setLanguage(): void {
    this._clientTranslation = this.translate.get('demo').subscribe(data => {
      this.firstName = data.firstName;
      this.columnDefs =
        [
          { headerName: data.id, field: 'id', sortable: true, filter: true },
          { headerName: data.firstName, field: 'firstName', sortable: true, filter: true },
          { headerName: data.lastName, field: 'lastName', sortable: true, filter: true },
          { headerName: data.gender, field: 'gender', sortable: true, filter: true },
          { headerName: data.address, field: 'address', sortable: true, filter: true },
          { headerName: data.phoneNumber, field: 'phoneNumber', sortable: true, filter: true }
        ];
    });
    console.log(this.firstName);
  }

  private getDataFromSockets(): void {

    this._socketSubscription = this.socketService.response().subscribe((data: EmployeeModel) => {
      console.log(data);
      this.agGrid.api.applyTransaction({ add: [data] });
    });
  }

  private getEmployeeData(): void {
    this._sub = this.service.getEmployeeData().subscribe((data) => {
      this.rowData = data;
      console.log(this.rowData);
    });
  }
  useLanguage(language: string): void {
    console.log(this.firstName);
    this.translate.use(language);
    this.setLanguage();
  }


  OnDestroy(): void {

    if (this._sub) {
      this._sub.unsubscribe();
    }
    if (this._clientTranslation) {
      this._clientTranslation.unsubscribe();
    }
    if (this._socketSubscription) {
      this._socketSubscription.unsubscribe();
    }
  }

}
