import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';

import { Account } from 'app/core/user/account.model';
import { Appointment } from 'app/shared/model/appointment.model';
import { Slot } from 'app/shared/model/slots.model';
import { MyHealthProfileService } from '../myhealthprofile.service';

@Component({
  selector: 'jhi-myappointments',
  templateUrl: './myappointments.component.html'
})
export class MyAppointmentsComponent implements OnInit, OnDestroy {
  currentAccount: Account | null = null;
  appointmentListSubscription?: Subscription;
  appointments: Appointment[] = [];
  appointment?: Appointment;
  selectedDate: any;
  slotsByDate?: Slot[] | null = null;
  selectedSlot1?: Slot | null = null;

  /* For pagination */
  totalItems = 0;
  itemsPerPage = 8;
  page!: number;
  predicate!: string;
  previousPage!: number;
  ascending!: boolean;

  constructor(
    protected myhealthprofileService: MyHealthProfileService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.page = 1;
    this.predicate = 'id';
    this.selectedSlot1 = {};
  }

  ngOnInit(): void {
    // this.activatedRoute.data
    //   .pipe(
    //     flatMap(
    //       () => this.accountService.identity(),
    //       (data, account) => {
    //         this.page = data.pagingParams.page;
    //         this.previousPage = data.pagingParams.page;
    //         this.ascending = data.pagingParams.ascending;
    //         this.predicate = data.pagingParams.predicate;
    //         this.currentAccount = account;
    //         this.loadAll();
    //         this.appointmentListSubscription = this.eventManager.subscribe('appointmentListModification', () => this.loadAll());
    //       }
    //     )
    //   )
    //   .subscribe();
    this.loadAll();
  }

  loadAll(): void {
    this.myhealthprofileService
      .findAppointment({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<Appointment[]>) => this.onSuccess(res.body, res.headers));
  }

  viewChange(value: any): void {
    this.itemsPerPage = value;
    this.page = 1;
    this.transition();
  }

  private onSuccess(appoint: Appointment[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.appointments = appoint ? appoint : [];
  }

  private sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  ngOnDestroy(): void {
    if (this.appointmentListSubscription) {
      this.eventManager.destroy(this.appointmentListSubscription);
    }
  }

  trackId(index: number, item: Appointment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition(): void {
    this.router.navigate(['./myappointments'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  registerChangeInSearches(): void {
    this.appointmentListSubscription = this.eventManager.subscribe('appointmentListModification', () => this.loadAll());
  }
}
