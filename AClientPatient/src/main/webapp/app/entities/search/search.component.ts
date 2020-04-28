import { Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatCalendar } from '@angular/material/datepicker';
import * as _ from 'lodash';

import { Search } from 'app/shared/model/search.model';
import { SearchService } from './search.service';
import { SearchDeleteDialogComponent } from './search-delete-dialog.component';
import { Country } from 'app/shared/model/country.model';
import { State } from 'app/shared/model/state.model';
import { City } from 'app/shared/model/city.model';
import { Speciality } from 'app/shared/model/speciality.model';
import { Slot } from 'app/shared/model/slots.model';
import { Appointment } from 'app/shared/model/appointment.model';

@Component({
  selector: 'jhi-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton', {static: false}) closebutton!: ElementRef;
  @ViewChild('closebutton1', {static: false}) closebutton1!: ElementRef;
  @ViewChild('calendar', {static: false}) calendar!: MatCalendar<Date>;
  selectedDate: any;
  groupslots = {};
  slots?: Slot[] | null = null;
  slotsByDate?: Slot[] | null = null;
  searches?: Search[] | null = null;
  countries?: Country[] | null = null;
  states?: State[] | null = null;
  cities?: City[] | null = null;
  specialities?: Speciality[] | null = null;
  eventSubscriber?: Subscription;
  countryId?: string | null = '';
  stateId?: string | null = '';
  cityId?: string | null = '';
  specialityId?: string | null = '';
  searchText?: string | null = '';
  selectedSlot?: Slot | null = null;
  selectedSlot1?: Slot | null = null;
  bookedAppoint?: Appointment | null = null;

  profileId?: number;
  searchContent!: boolean;
  viewProfileContent!: boolean;
  bookingAppointmentContent!: boolean;
  scheduleAppointment!: boolean;
  searchUser?: Search | null = null;
  confirmButtom!: boolean;
  confirmButtom1!: boolean;
  
  totalItems = 0;
  itemsPerPage = 8;
  page!: number;
  predicate!: string;
  previousPage!: number;
  ascending!: boolean;
  start!: number;
  end!: number;
  
  closeResult?: string | null = '';
   
  constructor(protected searchService: SearchService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {
	  this.showSearchResult();
  	this.page = 1;
  	this.start = 0;
  	this.end = this.itemsPerPage;
  	this.selectedSlot = this.selectedSlot1 = {};
  	this.confirmButtom = this.confirmButtom1 = true;
  	this.bookedAppoint = {};
  }

  loadAll(): void {
    this.searchService.getCountries().subscribe((res: HttpResponse<Country[]>) => {
      this.countries = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSearches();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: Search): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSearches(): void {
    this.eventSubscriber = this.eventManager.subscribe('searchListModification', () => this.loadAll());
  }

  delete(): void {
    const modalRef = this.modalService.open(SearchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.search = {};
  }

  private sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(searches: Search[] | null): void {
      this.searches = searches;
    if(searches != null) {
	    this.totalItems = searches.length;
	    // this.totalPages = Array(Math.ceil(this.totalItems/this.itemsPerPage)).fill().map((x: number,i: number) => i); // [0,1,2,3,4]
	  }
  }
  
  countryChange(filterVal: any): void {
    if (filterVal === "0") {
        this.states = [];
        this.cities = [];
        this.specialities = [];
        this.stateId = this.cityId = this.specialityId = '';
    } else {
    	this.countryId = filterVal;
        this.searchService.getStates(filterVal).subscribe((res: HttpResponse<State[]>) => {
	      this.states = res.body ? res.body : [];
	    });
    }
  }
  
  stateChange(filterVal: any): void {
    if (filterVal === "0") {
        this.cities = [];
        this.specialities = [];
        this.cityId = this.specialityId = '';
    } else {
    	this.stateId = filterVal;
        this.searchService.getCities(filterVal).subscribe((res: HttpResponse<State[]>) => {
	      this.cities = res.body ? res.body : [];
	    });
    }
  }
  
  cityChange(filterVal: any): void {
    if (filterVal === "0") {
        this.specialities = [];
        this.specialityId = '';
    } else {
    	this.cityId = filterVal;
        this.searchService.getSpecialities(filterVal).subscribe((res: HttpResponse<State[]>) => {
	      this.specialities = res.body ? res.body : [];
	    });
    }
  }
  
  specialityChange(filterVal: any): void {
    if (filterVal === "0") {
        this.specialityId = '';
    } else {
    	this.specialityId = filterVal;
    }
  }
  
  viewChange(filterVal: any): void {
  	this.itemsPerPage = filterVal;
    this.page = 1;
  	this.start = 0;
  	this.end = this.itemsPerPage;
  }

  search(): void {
    this.searchService
    .findProviders({
      	cityId: this.cityId, 
      	specialityId: this.specialityId, 
      	searchText: this.searchText
    }).subscribe((res: HttpResponse<Search[]>) => { 
        this.onSuccess(res.body);
    });
  }
  
  isDisabled(): boolean {
  	return this.cityId === '' && this.specialityId === '' && this.searchText === '';
  }
  
  changeValue(val: string, index: number): string {
  	let str = '';
  	if(index === 0) {
  		this.specialityId = val;
  		str = 'true';
  	}
  	return str;
  }
  
  viewProfile(search: Search): void {
  	this.profileId = search.id;
  	this.searchContent = false;
  	this.viewProfileContent = true;
  	this.bookingAppointmentContent = false;
  }
  
  bookingAppointment(search: Search): void {
  	this.searchUser = search;
  	this.searchContent = false;
  	this.viewProfileContent = false;
  	this.bookingAppointmentContent = true;
  	this.selectedSlot = {};
    this.confirmButtom = true;
    const currentDate = new Date();
  	this.searchService.getSlots({
		  'dateTime.greaterThan': currentDate.toISOString(),
      // 'isOccupied.equals'?: false, 
      'userId.equals': this.searchUser.id
    }).subscribe((res: HttpResponse<Slot[]>) => { 
		this.slots = res.body;
	    this.groupslots = _.groupBy(_.sortBy(this.slots, ['date', 'dateTime']), 'date');
    });
  }
  
  selectTime(slot: Slot): void {
  	this.selectedSlot = slot;
  	this.confirmButtom = false;
  }

  selectTime1(slot: Slot): void {
  	this.selectedSlot1 = slot;
  	this.confirmButtom1 = false;
  }

  cancelBookingAppointment(): void {
  	this.searchContent = true;
  	this.viewProfileContent = false;
  	this.bookingAppointmentContent = false;
  	this.selectedSlot = {};
  	this.groupslots = [];
  	this.bookedAppoint = {};
  }
  
  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      // this.transition();
      this.start = (page * this.itemsPerPage) - this.itemsPerPage;
      this.end = (page * this.itemsPerPage);
    }
  }
  
  bookAppointment(user: Search, slot: Slot): void {
  	this.searchService.bookAppointment({
	  	'providerID': user.id,
	  	'providerSlotID': slot.id,
	  	'slotDateTime': slot.dateTime
    }).subscribe((res: Appointment) => {
      this.bookedAppoint = res;
      // eslint-disable-next-line no-console
      // console.log(this.bookedAppoint);
      this.scheduleAppointment = true;
      this.bookingAppointmentContent = false;
    },
    (error:HttpErrorResponse) => {
        this.bookedAppoint = error.error;
        // eslint-disable-next-line no-console
        // console.log(error.error.message);
    });
  }
  
  showSearchResult(): void {
	  this.searchContent = true;
  	this.viewProfileContent = false;
  	this.bookingAppointmentContent = false;
  	this.scheduleAppointment = false;
  }
  
  cancelAppointment(): void {
  	if(this.bookedAppoint && this.bookedAppoint.id && this.bookedAppoint.status) {
	  	this.searchService.cancelAppointment(this.bookedAppoint.id).subscribe((res: Appointment) => {
        this.bookedAppoint!.status = res.status;
        // eslint-disable-next-line no-console
        // console.log(this.bookedAppoint);
        // this.scheduleAppointment = true;
        // this.bookingAppointmentContent = false;
        this.closebutton.nativeElement.click();
	    });
  	}
  }

  initRescheduleRequest(appoint: Appointment, slotStartDateTime: Date): void {
    this.confirmButtom1 = true;
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
    console.log(this.closebutton);
    this.selectedDate = event;
    if(this.bookedAppoint) {
      this.initRescheduleRequest(this.bookedAppoint, this.selectedDate);
    }    
  }
  
  rescheduleAppointment(): void {
    if(this.bookedAppoint && this.bookedAppoint.id && this.selectedSlot1) {
      this.searchService.rescheduleAppointment({
        'id': this.bookedAppoint.id,
        'providerSlotID': this.bookedAppoint.providerSlotID,
        'newProviderSlotID': this.selectedSlot1.id
      }).subscribe((res: Appointment) => {
        this.bookedAppoint = res;
        // eslint-disable-next-line no-console
        // console.log(this.bookedAppoint);
        this.closebutton1.nativeElement.click();
      },
      (error:HttpErrorResponse) => {
          this.bookedAppoint = error.error;
          // eslint-disable-next-line no-console
          // console.log(error.error.message);
      });
  	}
  }
  // ngAfterViewInit(): void {
    
  // }
}
