import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISearch, Search } from 'app/shared/model/search.model';
import { SearchService } from './search.service';
import { SearchComponent } from './search.component';
import { SearchDetailComponent } from './search-detail.component';
import { SearchUpdateComponent } from './search-update.component';

@Injectable({ providedIn: 'root' })
export class SearchResolve implements Resolve<ISearch> {
  constructor(private service: SearchService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISearch> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((search: HttpResponse<Search>) => {
          if (search.body) {
            return of(search.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Search());
  }
}

export const searchRoute: Routes = [
  {
    path: '',
    component: SearchComponent,
    data: {
      authorities: ['ROLE_PATIENT'],
      pageTitle: 'aClientPatientApp.search.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SearchDetailComponent,
    resolve: {
      search: SearchResolve
    },
    data: {
      authorities: ['ROLE_PATIENT'],
      pageTitle: 'aClientPatientApp.search.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SearchUpdateComponent,
    resolve: {
      search: SearchResolve
    },
    data: {
      authorities: ['ROLE_PATIENT'],
      pageTitle: 'aClientPatientApp.search.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SearchUpdateComponent,
    resolve: {
      search: SearchResolve
    },
    data: {
      authorities: ['ROLE_PATIENT'],
      pageTitle: 'aClientPatientApp.search.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
