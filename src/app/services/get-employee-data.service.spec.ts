import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetEmployeeDataService } from './get-employee-data.service';
import { EmployeeModel } from '../models/employee.model';

describe('GetEmployeeDataService', () => {
  let service: GetEmployeeDataService;
  let httpTestCtrl: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      providers: [GetEmployeeDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEmployeeDataService);
    httpTestCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should check the http client request', () => {
    const testData: EmployeeModel[] = [
      { 'id': 11, 'firstName': 'Dishu', 'lastName': 'Bagga', 'address': 'Via 41 Arezzo', 'gender': 'Male', 'phoneNumber': '01762236562' },
      { 'id': 12, 'firstName': 'Akash', 'lastName': 'Bagga', 'address': 'Via 42 Arezzo', 'gender': 'Male', 'phoneNumber': '04442173222' },
    ];
    service.getEmployeeData().subscribe((res) => {
      expect(res).toEqual(testData);
    });
    const req = httpTestCtrl.expectOne(service.BASE_URL);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(testData);
  });
});
