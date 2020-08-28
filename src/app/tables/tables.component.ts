import { Component, OnInit } from '@angular/core';
import { GetEmployeeDataService } from '../services/get-employee-data.service';
import { Subscription } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss', './tables.component.css']
})
export class TablesComponent implements OnInit {


  columnDefs = [
    { headerName: 'Id', field: 'id', sortable: true, filter: true },
    { headerName: 'Firstname', field: 'firstName', sortable: true, filter: true },
    { headerName: 'Lastname', field: 'lastName', sortable: true, filter: true },
    { headerName: 'Gender', field: 'gender', sortable: true, filter: true },
    { headerName: 'Address', field: 'address', sortable: true, filter: true },
    { headerName: 'Phonenumber', field: 'phoneNumber', sortable: true, filter: true }
  ];

  rowData: EmployeeModel[] = [];
  constructor(private service: GetEmployeeDataService) {

  }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  private getEmployeeData(): void {
    this.service.getEmployeeData().subscribe((data) => {
      this.rowData = data;
      console.log(this.rowData);
    });
  }


  OnDestroy(): void {

  }

}
