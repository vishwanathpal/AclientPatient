import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCalendar } from '@angular/material/datepicker';
// import { flatMap } from 'rxjs/operators';
import * as _ from 'lodash';

import { AppointmentService } from './appointment.service';
import { AccountService } from 'app/core/auth/account.service';
import { SearchService } from '../search/search.service';
import { Account } from 'app/core/user/account.model';
import { Appointment } from 'app/shared/model/appointment.model'; 
import { Slot } from 'app/shared/model/slots.model';


@Component({
  selector: 'jhi-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton', {static: false}) closebutton!: ElementRef;
  @ViewChild('closebutton1', {static: false}) closebutton1!: ElementRef;
  @ViewChild('calendar1', {static: false}) calendar!: MatCalendar<Date>;
  currentAccount: Account | null = null;
  appointmentListSubscription?: Subscription;
  appointments: Appointment[] = [];
  appointment?: Appointment;
  selectedDate: any;
  slotsByDate?: Slot[] | null = null;
  selectedSlot1?: Slot | null = null;
  confirmButtom1!: boolean;

  /* For pagination */
  totalItems = 0;
  itemsPerPage = 8;
  page!: number;
  predicate!: string;
  previousPage!: number;
  ascending!: boolean;
   
  constructor(
    protected appointmentService: AppointmentService,
    private searchService: SearchService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.page = 1;
    this.predicate = 'id';
    this.selectedSlot1 = {};
    this.confirmButtom1 = true;
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
    this.appointmentService.query({
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    }).subscribe((res: HttpResponse<Appointment[]>) => this.onSuccess(res.body, res.headers));
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
    this.router.navigate(['./'], {
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

  cancelAppointment(): void {
    if(this.appointment && this.appointment.id && this.appointment.status) {
      this.searchService.cancelAppointment(this.appointment.id).subscribe((res: Appointment) => {
        this.appointment!.status = res.status;
        // eslint-disable-next-line no-console
        // console.log(this.bookedAppoint);
        // this.scheduleAppointment = true;
        // this.bookingAppointmentContent = false;
        this.closebutton.nativeElement.click();
      });
    } 	
  }

  cancelRequest(appoint: Appointment): void {
    this.appointment = appoint;
  }

  rescheduleRequest(appoint: Appointment): void {
    if(appoint && appoint.slotStartDateTime) {
      this.appointment = appoint;
      this.initRescheduleRequest(appoint, appoint.slotStartDateTime);
    }    
  }

  private initRescheduleRequest(appoint: Appointment, slotStartDateTime: Date): void {
    if(appoint && appoint.providerID && slotStartDateTime) {
      const activeDate = new Date(slotStartDateTime);
      this.calendar.activeDate = activeDate;
      this.selectedDate = activeDate;
      this.calendar.focusActiveCell();

      activeDate.setHours(0);
      activeDate.setMinutes(0);
      activeDate.setSeconds(0);
      const activeDate1 = new Date(activeDate);
      activeDate1.setDate(activeDate.getDate() + 1);
      // eslint-disable-next-line no-console
      console.log(activeDate.toISOString());
      // eslint-disable-next-line no-console
      console.log(activeDate1.toISOString());

      this.searchService.getSlotsByDate({
        // 'dateTime.greaterThan'?: Date.now(),
        'dateTime.greaterThanOrEqual': activeDate.toISOString(),
        'dateTime.lessThan': activeDate1.toISOString(),
        // 'isOccupied.equals'?: false, 
        'userId.equals': appoint.providerID
      }).subscribe((res: HttpResponse<Slot[]>) => { 
        this.slotsByDate = _.sortBy(res.body, ['date', 'dateTime']);
      });
    }    
  }
  
  onSelect(event: MatCalendar<Date>): void {
    // eslint-disable-next-line no-console
    console.log(event);
    // eslint-disable-next-line no-console
    console.log(this.calendar);
    // eslint-disable-next-line no-console
    console.log(this.closebutton1);
    this.selectedDate = event;
    if(this.appointment) {
      this.initRescheduleRequest(this.appointment, this.selectedDate);
    }    
  }

  rescheduleAppointment(): void {
    if(this.appointment && this.appointment.id && this.selectedSlot1) {
      this.searchService.rescheduleAppointment({
        'id': this.appointment.id,
        'providerSlotID': this.appointment.providerSlotID,
        'newProviderSlotID': this.selectedSlot1.id
      }).subscribe((res: Appointment) => {
        Object.assign(this.appointment, res);
        // eslint-disable-next-line no-console
        // console.log(this.bookedAppoint);
        this.closebutton1.nativeElement.click();
      },
      (error:HttpErrorResponse) => {
          Object.assign(this.appointment, error.error);
          // eslint-disable-next-line no-console
          // console.log(error.error.message);
          this.closebutton1.nativeElement.click();
      });
  	}
  }

  selectTime1(slot: Slot): void {
    this.selectedSlot1 = slot;
    this.confirmButtom1 = false;
  }
  
}
