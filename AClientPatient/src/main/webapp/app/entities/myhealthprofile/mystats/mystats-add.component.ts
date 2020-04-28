import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IMyStats, MyStats } from 'app/shared/model/mystats.model';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyHealthProfileService } from 'app/entities/myhealthprofile/myhealthprofile.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'jhi-mystats-add',
  templateUrl: './mystats-add.component.html'
})
export class MyStatsAddComponent implements OnInit {
  isSaving = false;

  createForm = this.fb.group({
    weight: [],
    height: [],
    age: []
  });

  today: number = Date.now();

  constructor(
    public dialogRef: MatDialogRef<MyStatsAddComponent>,
    protected myHealthProfileService: MyHealthProfileService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const stats = this.createStats();
    this.subscribeToSaveResponse(this.myHealthProfileService.createMyStats(stats));
  }

  private createStats(): IMyStats {
    return {
      ...new MyStats(),
      age: '45',
      height: this.createForm.get(['height'])!.value,
      weight: this.createForm.get(['weight'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMyStats>>): void {
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
