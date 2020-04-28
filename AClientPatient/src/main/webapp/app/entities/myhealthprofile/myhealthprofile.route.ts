import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { IMyHealthProfile, MyHealthProfile } from 'app/shared/model/myhealthprofile.model';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { MyHealthProfileService } from './myhealthprofile.service';
import { MyHealthProfileComponent } from './myhealthprofile.component';
import { MyVitalsComponent } from './myvitals/myvitals.component';
import { MyStatsComponent } from './mystats/mystats.component';
import { MyAppointmentsComponent } from './myappointments/myappointments.component';
import { ReportsComponent } from './reports/reports.component';
import { PrescriptionsComponent } from './prescriptions/prescriptions.component';

@Injectable({ providedIn: 'root' })
export class MyHealthProfileResolve implements Resolve<IMyHealthProfile> {
  constructor(private service: MyHealthProfileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMyHealthProfile> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((myhealthprofile: HttpResponse<MyHealthProfile>) => {
          if (myhealthprofile.body) {
            return of(myhealthprofile.body);
          } else {
            this.router.navigate(['404']);

            return EMPTY;
          }
        })
      );
    }
    return of(new MyHealthProfile());
  }
}

export const myhealthprofileRoute: Routes = [
  {
    path: '',
    component: MyHealthProfileComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_PATIENT'],
      defaultSort: 'id,asc',
      pageTitle: 'myhealthprofile'
    },
    canActivate: [UserRouteAccessService],
    children: [
      {
        path: 'mystats',
        component: MyStatsComponent
      },
      {
        path: 'myvitals',
        component: MyVitalsComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'prescriptions',
        component: PrescriptionsComponent
      },
      {
        path: 'myappointments',
        component: MyAppointmentsComponent
      }
    ]
  }
];
