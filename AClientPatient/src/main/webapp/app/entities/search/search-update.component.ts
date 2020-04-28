import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISearch, Search } from 'app/shared/model/search.model';
import { SearchService } from './search.service';

@Component({
  selector: 'jhi-search-update',
  templateUrl: './search-update.component.html'
})
export class SearchUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    imageUrl: [],
    phoneNumber: []
  });

  constructor(protected searchService: SearchService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ search }) => {
      this.updateForm(search);
    });
  }

  updateForm(search: ISearch): void {
    this.editForm.patchValue({
      id: search.id,
      firstName: search.firstName,
      lastName: search.lastName,
      imageUrl: search.imageUrl,
      phoneNumber: search.phoneNumber
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const search = this.createFromForm();
    if (search.id !== undefined) {
      this.subscribeToSaveResponse(this.searchService.update(search));
    } else {
      this.subscribeToSaveResponse(this.searchService.create(search));
    }
  }

  private createFromForm(): ISearch {
    return {
      ...new Search(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      imageUrl: this.editForm.get(['imageUrl'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISearch>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
