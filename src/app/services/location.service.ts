import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { LocationMap } from './LocationMap';


@Injectable()
export class LocationService {
  public domain = 'https://dashboard.sem.run/api/website';


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
  public pricingBirthday = [];
  public pricingBirthdayUrl = [];


  constructor(private http: BaseHttpService ) { }



  setUrlBirthday(data: any) {
    const index = this.activeLocationId;
    let asd;
    if (data && data !== undefined && this.activeLocationId !== undefined ) {
      asd = data[0];
      this.pricingBirthdayUrl[index] = asd;
    }
  }

  setPricingBirthday(data: any, marker: string) {
    const index = this.activeLocationId;
    let asd;
    let combineName;

    if (data !== undefined && this.activeLocationId !== undefined ) {
      asd = data;
      combineName = index + "=>" + marker;
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

  getMapSrcByName(name: any): any {
    let id ;
    for (let i = 0; i < LIST_OF_LOCATIONS.length; i++) {
      if ( LIST_OF_LOCATIONS[i].nameUrl === name ) {
        return LIST_OF_LOCATIONS[i].id;
      }
    }
    return id;
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

  getLocationBirthdayParties(id: any, urlApi: string) {
    const url: string = this.domain + '/location/' + this.getIdByName(id) + urlApi;
    return this.http.get(url);
  }

}


export const LIST_OF_LOCATIONS: LocationMap[] =
  [{
    id : 1,
    nameUrl : 'lake-worth',
    title : 'LAKE WORTH',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.925901444166!2d-80.16874904897321!3d26.618821779004943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9266aeb2aebbf%3A0xc4ba2723db676c80!2sAdrenaline+Entertainment+Center!5e0!3m2!1sru!2sua!4v1522488220538',
  },
    {
      id : 4,
      nameUrl : 'york',
      title : 'YORK',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.080213238313!2d-76.77244968461787!3d39.961959279420604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c88c7a49beea5d%3A0xaf3dbed6072d53b1!2zMjE1MCBXaGl0ZSBTdCwgWW9yaywgUEEgMTc0MDQsINCh0KjQkA!5e0!3m2!1sru!2sua!4v1522488460439',
    },
    {
      id : 5,
      nameUrl : 'fayetteville',
      title : 'FAYETTEVILLE',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12891.85182833356!2d-94.1479715!3d36.1187602!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xac05e519348406df!2sAltitude+Trampoline+Park!5e0!3m2!1sru!2sua!4v1522488551504',
    },
    {
      id : 7,
      nameUrl : 'woodbridge',
      title : 'WOODBRIDGE',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12124.573369822634!2d-74.2977564!3d40.5605117!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x71a47f11f3d03746!2sAltitude+Trampoline+Park!5e0!3m2!1sru!2sua!4v1522488632228',
    },
    {
      id : 12,
      nameUrl : 'columbia',
      title : 'COLUMBIA',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13236.006286157855!2d-80.9460968!3d33.9667991!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfcb6705facd41c43!2sAdrenaline+Entertainment+Center!5e0!3m2!1sru!2sua!4v1522488718408',
    },
    {
      id : 13,
      nameUrl : 'cincinnati',
      title : 'CINCINNATI',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3087.7595841401!2d-84.31399538463793!3d39.29370247951142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x884056587ea980db%3A0xc44be41d45442352!2sAdrenaline+Entertainment+Center!5e0!3m2!1sru!2sua!4v1522488871298',
    }];
