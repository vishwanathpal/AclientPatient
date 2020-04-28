import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.AClientPatientDashboardModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.AClientPatientSearchModule)
      },
      {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then(m => m.AClientPatientAppointmentModule)
      },
      {
        path: 'myhealthprofile',
        loadChildren: () => import('./myhealthprofile/myhealthprofile.module').then(m => m.AClientPatientMyHealthProfileModule)
      }

      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AClientPatientEntityModule {}
