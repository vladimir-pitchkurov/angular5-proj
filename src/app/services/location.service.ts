import { Injectable } from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {LocationMap} from './LocationMap';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class LocationService {

  mapOfLoc: any[] = LIST_OF_LOCATIONS;

  getIdByName(name: any): any {
    let id ;

    let list = LIST_OF_LOCATIONS;
    for(let i = 0; i< LIST_OF_LOCATIONS.length; i++){
      if( LIST_OF_LOCATIONS[i].nameUrl === name ){
        console.log('equals');
        return LIST_OF_LOCATIONS[i].id;
      }
    }


    return id;
  }

  constructor(private http: BaseHttpService ) { }

  public activeLocationId: any;

  getLocationMap(){
    return this.mapOfLoc;
  }

  getActiveLocationId(): any {
    return (this.activeLocationId == undefined || this.activeLocationId == null || this.activeLocationId == '')?undefined:this.activeLocationId;
  }

  setActiveLocationId(value: any) {
    this.activeLocationId = value;
  }

  public domain: string = 'https://dashboard.sem.run/api/website';

  getAllLocations() {
    let url: string = this.domain + '/main/locations';
    return this.http.get(url);
  }

  getLocationById(id: any){
    let url: string = this.domain + '/location/' + this.getIdByName(id);
    return this.http.get(url);
  }

  getLocationAttribute(id: any) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/name';
    return this.http.get(url);
  }

  getLocationPricing(id: any) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/pricing';
    return this.http.get(url);
  }

  getLocationPricingByCategory(id: any, category: string) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/pricing/' + category;
    return this.http.get(url);
  }

  getLocationPricingByCategoryArea(id: any, category: string, area: string) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/pricing/' + category + "/" + area;
    return this.http.get(url);
  }

  getLocationPricingByCategoryAreaByLabel(id: any, category: string, area: string, label: string) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/pricing/' + category + "/" + area + "/" + label;
    return this.http.get(url);
  }

  getLocationSocial(id: any) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/social';
    return this.http.get(url);
  }

  getLocationSocialByName(id: any, name: string) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/social/' + name;
    return this.http.get(url);
  }

  getLocationHours(id: any) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/hours';
    return this.http.get(url);
  }

  getLocationHoursByLabel(id: any, label: string) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/hours/' + label;
    return this.http.get(url);
  }

  getLocationLinks(id: any) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/links';
    return this.http.get(url);
  }

  getLocationLinksByField(id: any, field: string) {
    let url: string = this.domain + '/location/' + this.getIdByName(id) + '/links/' + field;
    return this.http.get(url);
  }

}

export const LIST_OF_LOCATIONS: LocationMap[]=
  [{
    id : 1,
    nameUrl : "lake-worth",
    title : "LAKE WORTH"
  },
    {
      id : 4,
      nameUrl : "york",
      title : "YORK"
    },
    {
      id : 5,
      nameUrl : "fayetteville",
      title : "FAYETTEVILLE"
    },
    {
      id : 7,
      nameUrl : "woodbridge",
      title : "WOODBRIDGE"
    },
    {
      id : 12,
      nameUrl : "columbia",
      title : "COLUMBIA"
    },
    {
      id : 13,
      nameUrl : "cincinnati",
      title : "CINCINNATI"
    }];
