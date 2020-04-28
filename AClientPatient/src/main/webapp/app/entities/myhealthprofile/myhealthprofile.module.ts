import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AClientPatientSharedModule } from 'app/shared/shared.module';
import { MyHealthProfileComponent } from './myhealthprofile.component';
import { myhealthprofileRoute } from './myhealthprofile.route';
import { MyVitalsComponent } from './myvitals/myvitals.component';
import { MyAppointmentsComponent } from './myappointments/myappointments.component';
import { MyStatsComponent } from './mystats/mystats.component';
import { ReportsComponent } from './reports/reports.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';
import { MyVitalsAddComponent } from './myvitals/myvitals-add.component';
import { MyStatsAddComponent } from './mystats/mystats-add.component';
import { ReportsAddComponent } from './reports/reports-add.component';

@NgModule({
  imports: [AClientPatientSharedModule, RouterModule.forChild(myhealthprofileRoute), MatDialogModule],
  declarations: [
    MyHealthProfileComponent,
    MyVitalsComponent,
    MyAppointmentsComponent,
    MyStatsComponent,
    PrescriptionsComponent,
    ReportsComponent,
    MyVitalsAddComponent,
    MyStatsAddComponent,
    ReportsAddComponent
  ],
  entryComponents: [MyHealthProfileComponent, MyVitalsAddComponent, MyStatsAddComponent, ReportsAddComponent]
})
export class AClientPatientMyHealthProfileModule {}
