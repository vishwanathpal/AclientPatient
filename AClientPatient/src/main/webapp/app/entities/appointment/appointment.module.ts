import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import { AClientPatientSharedModule } from 'app/shared/shared.module';
import { AppointmentComponent } from './appointment.component';
import { appointmentRoute } from './appointment.route';

@NgModule({
  imports: [AClientPatientSharedModule, RouterModule.forChild(appointmentRoute),
    MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule,
    MatNativeDateModule,
    MatRippleModule,
  ],
  declarations: [AppointmentComponent],
  entryComponents: []
})
export class AClientPatientAppointmentModule {}
