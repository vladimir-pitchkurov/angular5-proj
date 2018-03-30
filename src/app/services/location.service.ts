import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { LocationMap } from './LocationMap';

@Injectable()
export class LocationService {
  public domain = 'https://dashboard.sem.run/api/website';

  constructor(private http: BaseHttpService ) { }

  public activeLocationId: any;
  mapOfLoc: any[] = LIST_OF_LOCATIONS;

  /*it is object-cache of location-by-id*/
  public infInFooter = false;
  public contactInfoOfFooter: object = {};


  public infSocialFacebook = false;
  public infSocialTwitter = false;
  public infSocialInstagram = false;
  public infSocialGoogle = false;
  public infSocialOfFooterFacebook: object = {};
  public infSocialOfFooterTwitter: object = {};
  public infSocialOfFooterInstagram: object = {};
  public infSocialOfFooterGoogle: object = {};
  public footerEmail: object = {};
  public pricingTrampolineGroups: any[] = [];


  setPricingTrampolineGroups(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined && this.activeLocationId !== undefined ) {
      console.log('in service set pricing', data);
      asd = data;
      this.pricingTrampolineGroups[index] = asd;
      console.log('this.pricing in service', this.pricingTrampolineGroups);
    }
  }


  findPricingTrampolineGroups(label: any) {
    let price = '';
    if (this.pricingTrampolineGroups[this.activeLocationId]){
      if (this.pricingTrampolineGroups[this.activeLocationId][0].location_id == this.getIdByName(this.activeLocationId)) {
          for (let i = 0; i < this.pricingTrampolineGroups[this.activeLocationId].length; i++) {
          if (  this.pricingTrampolineGroups[this.activeLocationId][i].label == label) {
            return this.pricingTrampolineGroups[this.activeLocationId][i].price;
          }
        }
      }
    }
  }


  setEmail(data: any) {
    const index = this.activeLocationId;
    let asd;

    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data;
      this.footerEmail[index] = asd;
    }
  }

  /*it is object-cache method of link Google*/
  setInfSocialGoogle(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.infSocialOfFooterGoogle[index] = asd;
      this.infSocialGoogle = true;
    }
  }
  /*it is object-cache method of link Instagram*/
  setInfSocialInstagram(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.infSocialOfFooterInstagram[index] = asd;
      this.infSocialInstagram = true;
    }
  }
  /*it is object-cache method of link Twitter*/
  setInfSocialTwitter(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.infSocialOfFooterTwitter[index] = asd;
      this.infSocialTwitter = true;
    }
  }
  /*it is object-cache method of link Facebook*/
  setInfSocialFacebook(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.infSocialOfFooterFacebook[index] = asd;
      this.infSocialFacebook = true;
    }
  }
  /*it is object-cache method of location-by-id*/
  setContactInf(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined) {
      asd = data[0];
      this.contactInfoOfFooter[index] = asd;
      this.infInFooter = true;
    }
  }


  getIdByName(name: any): any {
    let id ;
    for (let i = 0; i < LIST_OF_LOCATIONS.length; i++) {
      if ( LIST_OF_LOCATIONS[i].nameUrl === name ) {
        return LIST_OF_LOCATIONS[i].id;
      }
    }
    return id;
  }

  getActiveLocationTitle() {
    const nameUrl = this.activeLocationId ;
    for (let i = 0; i < LIST_OF_LOCATIONS.length; i++) {
      if ( LIST_OF_LOCATIONS[i].nameUrl === nameUrl ) {
        return LIST_OF_LOCATIONS[i].title;
      }
    }
    return 'Please, choose the location';
  }

  getLocationMap() {
    return this.mapOfLoc;
  }

  getActiveLocationId(): any {
    return (this.activeLocationId == undefined || this.activeLocationId == null || this.activeLocationId == '') ? undefined : this.activeLocationId;
  }

  setActiveLocationId(value: any) {
    this.activeLocationId = value;
    this.infInFooter = false;
    this.infSocialFacebook = false;
  }

  getAllLocations() {
    const url: string = this.domain + '/main/locations';
    return this.http.get(url);
  }

  getLocationCustomPricingById(id: any, urlA: any) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + urlA;
    return this.http.get(url);
  }

  getLocationById(id: any) {
    const url: string = this.domain + '/location/' + this.getIdByName(id);
    return this.http.get(url);
  }

  getLocationAttribute(id: any) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/name';
    return this.http.get(url);
  }

  getLocationPricing(id: any) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/pricing';
    return this.http.get(url);
  }

  getLocationPricingByCategory(id: any, category: string) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/pricing/' + category;
    return this.http.get(url);
  }

  getLocationPricingByCategoryArea(id: any, category: string, area: string) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/pricing/' + category + '/' + area;
    return this.http.get(url);
  }

  getLocationPricingByCategoryAreaByLabel(id: any, category: string, area: string, label: string) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/pricing/' + category + '/' + area + '/' + label;
    return this.http.get(url);
  }

  getLocationSocial(id: any) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/social';
    return this.http.get(url);
  }

  getLocationSocialByName(id: any, name: string) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/social/' + name;
    return this.http.get(url);
  }

  getLocationHours(id: any) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/hours';
    return this.http.get(url);
  }

  getLocationHoursByLabel(id: any, label: string) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/hours/' + label;
    return this.http.get(url);
  }

  getLocationLinks(id: any) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/links';
    return this.http.get(url);
  }

  getLocationLinksByField(id: any, field: string) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/links/' + field;
    return this.http.get(url);
  }

}

export const LIST_OF_LOCATIONS: LocationMap[] =
  [{
    id : 1,
    nameUrl : 'lake-worth',
    title : 'LAKE WORTH'
  },
    {
      id : 4,
      nameUrl : 'york',
      title : 'YORK'
    },
    {
      id : 5,
      nameUrl : 'fayetteville',
      title : 'FAYETTEVILLE'
    },
    {
      id : 7,
      nameUrl : 'woodbridge',
      title : 'WOODBRIDGE'
    },
    {
      id : 12,
      nameUrl : 'columbia',
      title : 'COLUMBIA'
    },
    {
      id : 13,
      nameUrl : 'cincinnati',
      title : 'CINCINNATI'
    }];
