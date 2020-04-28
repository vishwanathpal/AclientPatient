import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyHealthProfileService } from '../myhealthprofile.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { IMyVitals, MyVitals } from 'app/shared/model/myvitals.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-myvitals-add',
  templateUrl: './myvitals-add.component.html'
})
export class MyVitalsAddComponent implements OnInit {
  isSaving = false;

  createForm = this.fb.group({
    temp: [],
    repoRate: [],
    heartRate: [],
    bPressure: [],
    bsFasting: [],
    bsPost: []
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected myHealthProfileService: MyHealthProfileService,
    protected modalService: NgbModal,
    public dialogRef: MatDialogRef<MyVitalsAddComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  private createVitals(): IMyVitals {
    return {
      ...new MyVitals(),
      bodyTempture: this.createForm.get(['temp'])!.value,
      respiratoryRate: this.createForm.get(['repoRate'])!.value,
      heartRate: this.createForm.get(['heartRate'])!.value,
      bloodPresure: this.createForm.get(['bPressure'])!.value,
      bloodSugarBeforeMeal: this.createForm.get(['bsFasting'])!.value,
      bloodSugarAfterMeal: this.createForm.get(['bsPost'])!.value
    };
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const vitals = this.createVitals();
    window.console.log('vitals:' + vitals);
    this.subscribeToSaveResponse(this.myHealthProfileService.createMyVitals(vitals));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMyVitals>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.close();
  }
  protected onSaveError(): void {
    this.isSaving = false;
  }
}
