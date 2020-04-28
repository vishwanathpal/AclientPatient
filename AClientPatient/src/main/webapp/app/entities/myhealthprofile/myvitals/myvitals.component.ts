import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyHealthProfileService } from 'app/entities/myhealthprofile/myhealthprofile.service';
import { MyVitals } from 'app/shared/model/myvitals.model';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { MyVitalsAddComponent } from './myvitals-add.component';

@Component({
  selector: 'jhi-myvitals',
  templateUrl: './myvitals.component.html'
})
export class MyVitalsComponent implements OnInit {
  vital: MyVitals | null = null;
  vitals?: MyVitals[] | null = null;
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
  selectedOption!: string;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected myHealthProfileService: MyHealthProfileService,
    protected modalService: NgbModal,
    public matDialog: MatDialog
  ) {
    this.page = 1;
    this.start = 0;
    this.end = this.itemsPerPage;
  }

  ngOnInit(): void {
    this.getAllVitals();
  }

  getAllVitals(): void {
    this.myHealthProfileService
      .findVitals({
        page: this.page,
        size: this.itemsPerPage
      })
      .subscribe((res: HttpResponse<MyVitals[]>) => {
        this.onSuccess(res.body);
      });
  }

  private onSuccess(vitals: MyVitals[] | null): void {
    this.vitals = vitals;
    if (vitals != null) {
      this.totalItems = vitals.length;
      // this.totalPages = Array(Math.ceil(this.totalItems/this.itemsPerPage)).fill().map((x: number,i: number) => i); // [0,1,2,3,4]
      // this.itemsforpage();
    }
  }

  // itemsforpage():void{
  //    this.reportsdata = this.reports?.slice(this.start,this.end);
  // }

  viewChange(filterVal: any): void {
    this.itemsPerPage = filterVal;
    this.page = 1;
    this.start = 0;
    this.end = this.itemsPerPage;
  }

  loadPage(page: number): void {
    this.myHealthProfileService.findVitals().subscribe((res: HttpResponse<MyVitals[]>) => {
      this.onSuccess(res.body);
    });
  }

  previousState(): void {
    window.history.back();
  }

  openDialog(): void {
    const dialogref = this.matDialog.open(MyVitalsAddComponent);
    dialogref.afterClosed().subscribe(() => {
      this.getAllVitals();
    });
  }
}
