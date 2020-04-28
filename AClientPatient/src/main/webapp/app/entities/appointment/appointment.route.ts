import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAppointment, Appointment } from 'app/shared/model/appointment.model';
import { AppointmentService } from './appointment.service';
import { AppointmentComponent } from './appointment.component';


@Injectable({ providedIn: 'root' })
export class AppointmentResolve implements Resolve<IAppointment> {
  constructor(private service: AppointmentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAppointment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((search: HttpResponse<Appointment>) => {
          if (search.body) {
            return of(search.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Appointment());
  }
}

export const appointmentRoute: Routes = [
  {
    path: '',
    component: AppointmentComponent,
    data: {
      authorities: ['ROLE_PATIENT'],
      pageTitle: 'aClientPatientApp.search.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
