import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AClientPatientTestModule } from '../../../test.module';
import { SearchUpdateComponent } from 'app/entities/search/search-update.component';
import { SearchService } from 'app/entities/search/search.service';
import { Search } from 'app/shared/model/search.model';

describe('Component Tests', () => {
  describe('Search Management Update Component', () => {
    let comp: SearchUpdateComponent;
    let fixture: ComponentFixture<SearchUpdateComponent>;
    let service: SearchService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AClientPatientTestModule],
        declarations: [SearchUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SearchUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SearchUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SearchService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Search(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Search();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
