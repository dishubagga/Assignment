import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetEmployeeDataService {
  readonly BASE_URL: string = 'http://0.0.0.0:3000/employeedata';

  constructor(private httpClient: HttpClient) { }

  getEmployeeData(): Observable<EmployeeModel[]> {
    console.log(this.httpClient.get<EmployeeModel[]>(this.BASE_URL));
    return this.httpClient.get<EmployeeModel[]>(this.BASE_URL);
  }
}
