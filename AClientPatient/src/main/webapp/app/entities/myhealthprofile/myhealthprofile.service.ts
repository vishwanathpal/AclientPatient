import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';

import { SERVER_API_URL } from 'app/app.constants';
import { IMyHealthProfile } from 'app/shared/model/myhealthprofile.model';
import { IReports } from 'app/shared/model/reports.model';
import { IMyVitals } from 'app/shared/model/myvitals.model';
import { IPrescriptions } from 'app/shared/model/prescriptions.model';
import { IAppointment } from 'app/shared/model/appointment.model';
import { ISlot } from 'app/shared/model/slots.model';
import { IDocument } from 'app/shared/model/document.model';
import { IMyStats } from 'app/shared/model/mystats.model';

type EntityResponseType = HttpResponse<IMyHealthProfile>;
type EntityArrayResponseType = HttpResponse<IMyHealthProfile[]>;

@Injectable({ providedIn: 'root' })
export class MyHealthProfileService {
  public resourceUrl = SERVER_API_URL + 'services/bookingappointment/api';

  constructor(protected http: HttpClient) {}

  createMyStats(mystats: IMyStats): Observable<EntityResponseType> {
    return this.http.post<IMyStats>(this.resourceUrl + '/patient-stats', mystats, { observe: 'response' });
  }

  createMyVitals(myvitals: IMyVitals): Observable<EntityResponseType> {
    return this.http.post<IMyVitals>(this.resourceUrl + '/patients-vitals', myvitals, { observe: 'response' });
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMyHealthProfile[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMyHealthProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findStats(): Observable<EntityArrayResponseType> {
    return this.http.get<IMyStats[]>(this.resourceUrl + '/patient-stats', { observe: 'response' });
  }

  findReports(): Observable<EntityArrayResponseType> {
    return this.http.get<IReports[]>(this.resourceUrl + '/documents/reports', { observe: 'response' });
  }

  findVitals(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMyVitals[]>(this.resourceUrl + '/patients-vitals/user', { params: options, observe: 'response' });
  }

  findPrescriptions(): Observable<EntityArrayResponseType> {
    return this.http.get<IPrescriptions[]>(this.resourceUrl + '/prescriptions/user', { observe: 'response' });
  }
  findAppointment(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAppointment[]>(this.resourceUrl + '/book-appointments', { params: options, observe: 'response' });
  }

  getAllAppointment(): Observable<EntityArrayResponseType> {
    return this.http.get<IAppointment[]>(this.resourceUrl + '/book-appointments', { observe: 'response' });
  }

  getSlotsByDate(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISlot[]>(this.resourceUrl + 'provider-slots', { params: options, observe: 'response' });
  }

  getAllDocumentTypes(): Observable<EntityArrayResponseType> {
    return this.http.get<IDocument[]>(this.resourceUrl + '/document-types', { observe: 'response' });
  }
}
