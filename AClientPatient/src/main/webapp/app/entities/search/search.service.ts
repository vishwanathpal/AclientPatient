import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISearch } from 'app/shared/model/search.model';
import { ICountry } from 'app/shared/model/country.model';
import { IState } from 'app/shared/model/state.model';
import { ICity } from 'app/shared/model/city.model';
import { ISpeciality } from 'app/shared/model/speciality.model';
import { ISlot } from 'app/shared/model/slots.model';
import { IAppointment } from 'app/shared/model/appointment.model';

type EntityResponseType = HttpResponse<ISearch>;
type EntityArrayResponseType = HttpResponse<ISearch[]>;

@Injectable({ providedIn: 'root' })
export class SearchService {
  public resourceUrl = SERVER_API_URL + 'services/searchprovider/api/';
  public resourceUrl1 = SERVER_API_URL + 'services/bookingappointment/api/';

  constructor(protected http: HttpClient) {}

  create(search: ISearch): Observable<EntityResponseType> {
    return this.http.post<ISearch>(this.resourceUrl, search, { observe: 'response' });
  }

  update(search: ISearch): Observable<EntityResponseType> {
    return this.http.put<ISearch>(this.resourceUrl, search, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISearch>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISearch[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getCountries(): Observable<EntityArrayResponseType> {
    return this.http.get<ICountry[]>(this.resourceUrl + 'countries', { observe: 'response' });
  }
  
  getStates(countryid: string): Observable<EntityArrayResponseType> {
    return this.http.get<IState[]>(this.resourceUrl + 'getstates/' + countryid, { observe: 'response' });
  }
  
  getCities(stateid: number): Observable<EntityArrayResponseType> {
    return this.http.get<ICity[]>(this.resourceUrl + 'getcities/' + stateid, { observe: 'response' });
  }
  
  getSpecialities(cityid: number): Observable<EntityArrayResponseType> {
    return this.http.get<ISpeciality[]>(this.resourceUrl + 'getspecialities/' + cityid, { observe: 'response' });
  }

  findProviders(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISearch[]>(this.resourceUrl + 'search/providers', { params: options, observe: 'response' });
  }
  
  getSlots(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISlot[]>(this.resourceUrl + 'provider-slots', { params: options, observe: 'response' });
  }
  
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  
  bookAppointment(appointment: any): Observable<IAppointment> {
    return this.http.post<IAppointment>(this.resourceUrl + 'search/appointment', appointment);
  }
  
  cancelAppointment(id: number): Observable<IAppointment> {
  	return this.http.delete<IAppointment>(this.resourceUrl1 + 'appointment/cancel/' + id);
  }

  getSlotsByDate(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISlot[]>(this.resourceUrl + 'provider-slots', { params: options, observe: 'response' });
  }

  rescheduleAppointment(appointment: any): Observable<IAppointment> {
    return this.http.put<IAppointment>(this.resourceUrl + 'search/appointment', appointment);
  }  
}
