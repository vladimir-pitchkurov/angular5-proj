import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';


@Injectable()
export class LocationService {
  public domain = 'https://dashboard.sem.run/api/website';
  public activeLocationId: any;
  public locationInformation = [];
  public locationHours = [];
  public LIST_OF_LOCATIONS = [];
  mapOfLoc = [];
  public contactInfoOfFooter: object = {};
  public infSocialOfFooterFacebook: object = {};
  public infSocialOfFooterTwitter: object = {};
  public infSocialOfFooterInstagram: object = {};
  public infSocialOfFooterGoogle: object = {};
  public footerEmail: object = {};
  public pricingTrampolineGroups: any[] = [];
  public pricingBirthday = [];
  public pricingBirthdayUrl = [];
  public allLinksCenteredge_waiver = [];
  public allLinksCenteredge_tickets = [];
  public locationPricings = [];
  public locationDeals = [];


  constructor(private http: BaseHttpService ) { }

  setLocationHours( data ) {
    const index = this.activeLocationId;
    let asd;
    if (data && data !== undefined && this.activeLocationId !== undefined ) {
      asd = data;
      this.locationHours[index] = asd;
    }
  }

  setLocationInformation( data ) {
    const index = this.activeLocationId;
    let asd;
    if (data && data !== undefined && this.activeLocationId !== undefined ) {
      asd = data;
      this.locationInformation[index] = asd;
    }
  }

  isComingSoon(){
    let active = this.activeLocationId;
    if ( this.LIST_OF_LOCATIONS.length > 0 && this.activeLocationId ) {
      for (let i = 0; i < this.LIST_OF_LOCATIONS.length; i++ ) {
        let loc = this.LIST_OF_LOCATIONS[i];
        if(loc.slug == active ){
          let bool = loc.status;
          return loc.status === 'live' ? false : true;
        }
      }
    }
  }

  setMapOfLoc(data) {
    if(data) {
      this.mapOfLoc = data;
      this.LIST_OF_LOCATIONS = data;
    }
  }

  setLocationDeals( data ) {
    const index = this.activeLocationId;
    let asd;
    if (data && data !== undefined && this.activeLocationId !== undefined ) {
      asd = data;
      this.locationDeals[index] = asd;
    }
  }

  setLocationPricings( data ) {
    const index = this.activeLocationId;
    let asd;
    if (data && data !== undefined && this.activeLocationId !== undefined ) {
      asd = data;
      console.log('in service loc pricing ', data);
      this.locationPricings[index] = asd;
    }
  }

  setAllLinksCenteredge_tickets ( data ) {
    const index = this.activeLocationId;
    let asd;
    if (data && data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.allLinksCenteredge_tickets[index] = asd;
    }
  }

  setAllLinksCenteredge_waiver ( data ) {
    const index = this.activeLocationId;
    let asd;
    if (data && data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.allLinksCenteredge_waiver[index] = asd;
    }
  }

  setUrlBirthday(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data && data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.pricingBirthdayUrl[index] = asd;
    }
  }

  setPricingBirthday(data: any) {
    const index = this.activeLocationId;
    let asd;
    let combineName;

    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data;
      combineName = index;
      this.pricingBirthday[combineName] = asd;
    }
  }

  setPricingTrampolineGroups(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data;
      this.pricingTrampolineGroups[index] = asd;
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
      //this.infSocialGoogle = true;
    }
  }
  /*it is object-cache method of link Instagram*/
  setInfSocialInstagram(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.infSocialOfFooterInstagram[index] = asd;
      //this.infSocialInstagram = true;
    }
  }
  /*it is object-cache method of link Twitter*/
  setInfSocialTwitter(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.infSocialOfFooterTwitter[index] = asd;
      //this.infSocialTwitter = true;
    }
  }
  /*it is object-cache method of link Facebook*/
  setInfSocialFacebook(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.infSocialOfFooterFacebook[index] = asd;
      //this.infSocialFacebook = true;
    }
  }
  /*it is object-cache method of location-by-id*/
  setContactInf(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data !== undefined) {
      asd = data[0];
      this.contactInfoOfFooter[index] = asd;
      //this.infInFooter = true;
    }
  }

  getMapSrcByName(name: any) {
    let id ;
    for (let i = 0; i < this.LIST_OF_LOCATIONS.length; i++) {
      if ( this.LIST_OF_LOCATIONS[i].slug === name ) {
        return this.LIST_OF_LOCATIONS[i].id;
      }
    }
    return id;
  }

  getIdByName(name: any): any {
    let id ;
    for (let i = 0; i < this.LIST_OF_LOCATIONS.length; i++) {
      if ( this.LIST_OF_LOCATIONS[i].slug === name ) {
        return this.LIST_OF_LOCATIONS[i].id;
      }
    }
    return id;
  }

  getActiveLocationTitle() {
    const nameUrl = this.activeLocationId ;
    for (let i = 0; i < this.LIST_OF_LOCATIONS.length; i++) {
      if ( this.LIST_OF_LOCATIONS[i].slug === nameUrl ) {
        return this.LIST_OF_LOCATIONS[i].menu_name;
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
    //this.infInFooter = false;
    //this.infSocialFacebook = false;
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

  getLocationDeals(id: any) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/deals';
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

  getLocationLinksCenteredge_waiver(id: any) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/links/centeredge_waiver';
    return this.http.get(url);
  }

  getLocationLinksByField(id: any, field: string) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + '/links/' + field;
    return this.http.get(url);
  }

  getLocationBirthdayParties( urlApi: string) {
    const url: string = this.domain + '/location/' + this.getIdByName(this.activeLocationId) + urlApi;
    return this.http.get(url);
  }

  sendPostContact(data) {
    const url = this.domain + '/location/contact';
    return this.http.post(url, data);
  }

  sendPostComing(data) {
    const url = this.domain + '/location/subscribe';
    return this.http.post(url, data);
  }

}
