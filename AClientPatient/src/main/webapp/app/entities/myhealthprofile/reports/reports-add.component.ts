import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MyHealthProfileService } from '../myhealthprofile.service';
import { Document } from 'app/shared/model/document.model';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'app/shared/model/appointment.model';

@Component({
  selector: 'jhi-reports-add',
  templateUrl: './reports-add.component.html'
})
export class ReportsAddComponent implements OnInit {
  document?: Document[] | null = null;
  appointment?: Appointment[] | null = null;
  file?: File;

  constructor(
    public dialogRef: MatDialogRef<ReportsAddComponent>,
    protected myHealthProfileService: MyHealthProfileService,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadDocType();
    this.loadAppointments();
  }

  loadDocType(): void {
    this.myHealthProfileService.getAllDocumentTypes().subscribe((res: HttpResponse<Document[]>) => {
      this.document = res.body;
    });
  }

  loadAppointments(): void {
    this.myHealthProfileService.getAllAppointment().subscribe((res: HttpResponse<Document[]>) => {
      this.appointment = res.body;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  handleFileInput(value?: File): void {
    this.file = value;
  }
}
