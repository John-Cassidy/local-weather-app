import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultIfEmpty, mergeMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

export interface IPostalCode {
  countryCode: string;
  postalCode: string;
  placeName: string;
  lng: number;
  lat: number;
}

export interface IPostalCodeData {
  postalCodes: [IPostalCode];
}

export interface IPostalCodeService {
  resolvePostalCode(postalCode: string, country?: string): Observable<IPostalCode>;
}

@Injectable({
  providedIn: 'root',
})
export class PostalCodeService implements IPostalCodeService {
  constructor(private httpClient: HttpClient) {}

  resolvePostalCode(postalCode: string, country?: string): Observable<IPostalCode> {
    let uriParams: HttpParams;

    uriParams = new HttpParams();
    uriParams = uriParams.set('maxRows', '1');
    uriParams = uriParams.set('username', environment.geousername);
    uriParams = uriParams.set('postalcode', postalCode);

    if (country) {
      uriParams = uriParams.set('countryCode', country);
    }

    return this.httpClient
      .get<IPostalCodeData>(
        `${environment.baseUrl}${environment.geonamesApi}.geonames.org/postalCodeSearchJSON`,
        { params: uriParams }
      )
      .pipe(
        mergeMap((data) => data.postalCodes),
        defaultIfEmpty(null)
      );
  }
}
