import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyHealthProfileService } from 'app/entities/myhealthprofile/myhealthprofile.service';
import { MatDialog } from '@angular/material/dialog';
import { MyStatsAddComponent } from './mystats-add.component';
import { MyStats } from 'app/shared/model/mystats.model';

@Component({
  selector: 'jhi-mystats',
  templateUrl: './mystats.component.html'
})
export class MyStatsComponent implements OnInit {
  stat: MyStats | null = null;
  stats?: MyStats[] | null = null;
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
  ) // public dialogRef: MatDialogRef<MyStatsAddComponent>

  {
    this.page = 1;
    this.start = 0;
    this.end = this.itemsPerPage;
  }

  ngOnInit(): void {
    this.getAllStats();
  }

  getAllStats(): void {
    this.myHealthProfileService.findStats().subscribe((res: HttpResponse<MyStats[]>) => {
      this.onSuccess(res.body);
    });
  }

  private onSuccess(stats: MyStats[] | null): void {
    this.stats = stats;
    if (stats != null) {
      this.totalItems = stats.length;
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
  openDialog(): void {
    const dialogref = this.matDialog.open(MyStatsAddComponent);
    dialogref.afterClosed().subscribe(() => {
      this.getAllStats();
    });
  }
}
