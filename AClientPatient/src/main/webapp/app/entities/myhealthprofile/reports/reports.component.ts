import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyHealthProfileService } from 'app/entities/myhealthprofile/myhealthprofile.service';
import { Reports } from 'app/shared/model/reports.model';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'app/core/user/account.model';
import { MatDialog } from '@angular/material/dialog';
import { ReportsAddComponent } from './reports-add.component';

@Component({
  selector: 'jhi-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
  report: Reports | null = null;
  reports?: Reports[] | null = null;
  reportsdata?: Reports[] | null = null;
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
    protected modalService: NgbModal,
    public matDialog: MatDialog
  ) {
    this.page = 1;
    this.start = 0;
    this.end = this.itemsPerPage - 1;
  }

  ngOnInit(): void {
    this.getAllReports();
  }

  getAllReports(): void {
    this.myHealthProfileService.findReports().subscribe((res: HttpResponse<Reports[]>) => {
      this.onSuccess(res.body);
    });
  }

  private onSuccess(reports: Reports[] | null): void {
    this.reports = reports;
    if (reports != null) {
      this.totalItems = reports.length;
      //this.reports = Array(this.itemsPerPage).fill(0).map((x: number,i: number) => i); // [0,1,2,3,4]
      // this.itemsforpage();
      window.console.log('reports' + this.reports);
      window.console.log('totalItems' + this.totalItems);
      window.console.log('itemsforpage' + this.itemsPerPage);
      window.console.log('start' + this.start);
      window.console.log('end' + this.end);
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
      this.end = page * this.itemsPerPage - 1;
    }
    // this.itemsforpage();
  }

  previousState(): void {
    window.history.back();
  }

  openDialog(): void {
    this.matDialog.open(ReportsAddComponent);
  }
}
