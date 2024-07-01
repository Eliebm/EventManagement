import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DataObject } from '../Models/data-object';

@Injectable({
  providedIn: 'root',
})
export class RestRequestServiceService {
  private url!: string;
  constructor(private httpClient: HttpClient) {
    this.url = 'https://api.restful-api.dev/';
  }

  getDataObject(): Observable<DataObject[]> {
    return this.httpClient.get<DataObject[]>(this.url + 'objects');
  }
}
