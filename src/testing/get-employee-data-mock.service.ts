import { EmployeeModel } from '../app/models/employee.model';
import { Observable, Observer } from 'rxjs';

export class MockGetEmployeeDataService {
  mockEmployeeData: EmployeeModel[] = [
    { 'id': 11, 'firstName': 'Dishu', 'lastName': 'Bagga', 'address': 'Via 41 Arezzo', 'gender': 'Male', 'phoneNumber': '01762236562' },
    { 'id': 12, 'firstName': 'Akash', 'lastName': 'Bagga', 'address': 'Via 42 Arezzo', 'gender': 'Male', 'phoneNumber': '04442173222' },
  ];
  getEmployeeData(): Observable<EmployeeModel[]> {
    return new Observable((observer: Observer<EmployeeModel[]>) => {
      observer.next(this.mockEmployeeData);
    });
  }
}
