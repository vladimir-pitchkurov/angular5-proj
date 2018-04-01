import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable()
export class BaseHttpService {

  constructor(private http: HttpClient) { }


  get(url: string) {
    return this.http.get(url)
      .toPromise()
      .then(data => {
        return data;
      })
      .catch(this.handleError);
  }


  post(url: string, data: any) {
    return this.http.post(url, data)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError);
  }


  handleData(data: any) {
    return data;
  }


  handleError(error: HttpErrorResponse) {
    console.log('handle error', error);
    throw error;
  }

}
