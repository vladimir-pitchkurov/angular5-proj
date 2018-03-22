import { Injectable } from '@angular/core';
import {BaseHttpService} from './base-http.service';

@Injectable()
export class LocationService {

  constructor(private http: BaseHttpService) { }

  public domain: string = 'https://dashboard.sem.run/api/website';

  /* for local testing

  getLocations() {

      let locationsData: any[] = [
        {city: 'New York'},{city: 'Los Angeles'},{name: 'Sitka'}
      ];

      return Promise.resolve(locationsData);

  }*/

  getAllLocations() {
    let url: string = this.domain + '/main/locations';
    return this.http.get(url);
  }

  getLocationById(id: any){
    let url: string = this.domain + '/location/' + id;
    return this.http.get(url);
  }

  getLocationAttribute(id: any) {
    let url: string = this.domain + '/location/' + id + '/name';
    return this.http.get(url);
  }

  getLocationPricing(id: any) {
    let url: string = this.domain + '/location/' + id + '/pricing';
    return this.http.get(url);
  }

  getLocationPricingByCategory(id: any, category: string) {
    let url: string = this.domain + '/location/' + id + '/pricing/' + category;
    return this.http.get(url);
  }

  getLocationPricingByCategoryArea(id: any, category: string, area: string) {
    let url: string = this.domain + '/location/' + id + '/pricing/' + category + "/" + area;
    return this.http.get(url);
  }

  getLocationPricingByCategoryAreaByLabel(id: any, category: string, area: string, label: string) {
    let url: string = this.domain + '/location/' + id + '/pricing/' + category + "/" + area + "/" + label;
    return this.http.get(url);
  }

  getLocationSocial(id: any) {
    let url: string = this.domain + '/location/' + id + '/social';
    return this.http.get(url);
  }

  getLocationSocialByName(id: any, name: string) {
    let url: string = this.domain + '/location/' + id + '/social/' + name;
    return this.http.get(url);
  }

  getLocationHours(id: any) {
    let url: string = this.domain + '/location/' + id + '/hours';
    return this.http.get(url);
  }

  getLocationHoursByLabel(id: any, label: string) {
    let url: string = this.domain + '/location/' + id + '/hours/' + label;
    return this.http.get(url);
  }

  getLocationLinks(id: any) {
    let url: string = this.domain + '/location/' + id + '/links';
    return this.http.get(url);
  }

  getLocationLinksByField(id: any, field: string) {
    let url: string = this.domain + '/location/' + id + '/links/' + field;
    /*return Promise.resolve(url.split('/'));    this method for testing correctly work local*/
    return this.http.get(url);
  }

}
