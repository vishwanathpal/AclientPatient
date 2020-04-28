import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyHealthProfileService } from 'app/entities/myhealthprofile/myhealthprofile.service';
import { Prescriptions } from 'app/shared/model/prescriptions.model';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-prescriptions',
  templateUrl: './prescriptions.component.html'
})
export class PrescriptionsComponent implements OnInit {
  prescription: Prescriptions | null = null;
  prescriptions?: Prescriptions[] | null = null;
  totalItems = 0;
  itemsPerPage = 8;
  page!: number;
  predicate!: string;
  previousPage!: number;
  ascending!: boolean;
  start!: number;
  end!: number;
  userId?: number;
  account: Account | null = null;
  totalPages = 0;
  activePage = 1;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected myHealthProfileService: MyHealthProfileService,
    protected modalService: NgbModal
  ) {
    this.page = 1;
    this.start = 0;
    this.end = this.itemsPerPage;
  }

  ngOnInit(): void {
    this.getAllPrescriptions();
  }

  getAllPrescriptions(): void {
    this.myHealthProfileService.findPrescriptions().subscribe((res: HttpResponse<Prescriptions[]>) => {
      this.onSuccess(res.body);
    });
  }

  private onSuccess(prescriptions: Prescriptions[] | null): void {
    this.prescriptions = prescriptions;
    if (prescriptions != null) {
      this.totalItems = prescriptions.length;
      // this.totalPages = Array(Math.ceil(this.totalItems/this.itemsPerPage)).fill().map((x: number,i: number) => i); // [0,1,2,3,4]
      // this.itemsforpage();
    }
  }

  // itemsforpage():void{
  // this.reportsdata = this.reports?.slice(this.start,this.end);
  // }

  viewChange(filterVal: any): void {
    this.itemsPerPage = filterVal;
    this.page = 1;
    this.start = 0;
    this.end = this.itemsPerPage;
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      // this.transition();
      this.start = page * this.itemsPerPage - this.itemsPerPage;
      this.end = page * this.itemsPerPage;
    }
    // this.itemsforpage();
  }

  previousState(): void {
    window.history.back();
  }
}
