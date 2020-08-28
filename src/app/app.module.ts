// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

// Components
import { AppComponent } from './app.component';
import { TablesComponent } from './tables/tables.component';

// Providers
import { GetEmployeeDataService } from './services/get-employee-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
  ],
  providers: [GetEmployeeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
