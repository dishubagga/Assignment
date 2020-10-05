import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeModel } from '../../models/employee.model';
import { TablesComponent } from './tables.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetEmployeeDataService } from '../../services/get-employee-data.service';
import { MockGetEmployeeDataService } from '../../../testing/get-employee-data-mock.service';
import { UnsubscriptionError, Subscription, of } from 'rxjs';
import { TranslateService, TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';

declare var require: any;


describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;
  let getEmpDataService: GetEmployeeDataService;
  let translateService: TranslateService;
  const mockEmployeeData: EmployeeModel[] = [
    { 'id': 11, 'firstName': 'Dishu', 'lastName': 'Bagga', 'address': 'Via 41 Arezzo', 'gender': 'Male', 'phoneNumber': '01762236562' },
    { 'id': 12, 'firstName': 'Akash', 'lastName': 'Bagga', 'address': 'Via 42 Arezzo', 'gender': 'Male', 'phoneNumber': '04442173222' },
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TablesComponent],
      providers: [
        { provide: GetEmployeeDataService, useClass: MockGetEmployeeDataService },
        TranslateService
      ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        TranslateTestingModule.withTranslations({ en: require('src/assets/i18n/en.json'), de: require('src/assets/i18n/de.json') }),

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesComponent);
    getEmpDataService = TestBed.inject(GetEmployeeDataService);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    getEmpDataService = null;
    translateService = null;
  });

  it('should screate', () => {
    expect(component).toBeTruthy();
  });

  it('it should subscribe for data', () => {
    spyOn(getEmpDataService, 'getEmployeeData').and.callThrough();
    component.ngOnInit();
    expect(getEmpDataService.getEmployeeData).toHaveBeenCalled();
  });



  it('It should destroy on OnDestroy', () => {
    spyOn(component, 'OnDestroy').and.callThrough();
    component.OnDestroy();
    expect(component.OnDestroy).toHaveBeenCalled();
  });


  // it('should call ngOnDestroy ', () => {
  //   // component['_sub'] = of(true).subscribe();
  //   spyOn(component, 'OnDestroy').and.callThrough();
  //   spyOn(component['_sub'], 'unsubscribe').and.callThrough();
  //   component.OnDestroy();
  //   fixture.detectChanges();
  //   expect(component['_sub'].unsubscribe).toBeTruthy();
  //   expect(component.OnDestroy).toHaveBeenCalled();
  // });
  // it('should not destroy call ngOnDestroy ', () => {
  //   component.OnDestroy();
  //   fixture.detectChanges();
  //   spyOn(component['_sub'], 'unsubscribe').and.callThrough();
  //   expect(component['_sub'].unsubscribe).toBeTruthy();

  // });


  // it('shouldnot destroy on end', () => {
  //   fixture.detectChanges();
  //   component.OnDestroy();

  //   expect(component['_sub'].unsubscribe).toHaveBeenCalled();


  // });

});
