import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AClientPatientTestModule } from '../../../test.module';
import { SearchDetailComponent } from 'app/entities/search/search-detail.component';
import { Search } from 'app/shared/model/search.model';

describe('Component Tests', () => {
  describe('Search Management Detail Component', () => {
    let comp: SearchDetailComponent;
    let fixture: ComponentFixture<SearchDetailComponent>;
    const route = ({ data: of({ search: new Search(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AClientPatientTestModule],
        declarations: [SearchDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SearchDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SearchDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load search on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.search).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
