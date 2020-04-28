import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISearch } from 'app/shared/model/search.model';
import { SearchService } from './search.service';

@Component({
  templateUrl: './search-delete-dialog.component.html'
})
export class SearchDeleteDialogComponent {
  search?: ISearch;

  constructor(protected searchService: SearchService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.searchService.delete(id).subscribe(() => {
      this.eventManager.broadcast('searchListModification');
      this.activeModal.close();
    });
  }
}
