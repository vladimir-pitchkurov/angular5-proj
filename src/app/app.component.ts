import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {InitJsService} from './services/init-js.service';
import {NavigationEnd, Router} from '@angular/router';
import {LocationService} from './services/location.service';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, DoCheck {
  title = 'app';
  public locations = [];
  activeLocationId: any;
  locationInf: any[];
  isDarkFooter = false;
  amenities = [];
  isTrampoline = true;
  isEscape = true;
  isVr = true;
  isComingSoonChecked = false;
  isComingSoon = false;

  constructor( private router: Router
             , private service: LocationService ) { }

  ngOnInit() {

    this.activeLocationId = this.service.getActiveLocationId();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      this.defineIsFooterDark();

      if (this.activeLocationId && !this.service.contactInfoOfFooter[this.activeLocationId]) {
        this.service.getLocationById(this.activeLocationId)
          .then((data: any[]) => {
            this.locationInf = data;
          });
      }

      if(this.service.LIST_OF_LOCATIONS.length == 0){
        this.service.getAllLocations()
          .then((data: any[]) => {
            this.locations = data;
            this.service.LIST_OF_LOCATIONS = this.locations;
          });
      }else {
        this.locations = this.service.LIST_OF_LOCATIONS;
      }

      if(this.service.LIST_OF_LOCATIONS.length == 0 && this.locations.length > 0){
        this.service.setMapOfLoc(this.locations);
      }
    });

  }

  nullLocation() {
    this.activeLocationId = undefined;
    this.service.activeLocationId = undefined;
  }

  initMenu() {
    InitJsService.afterViewMenuTramp();
  }

  isIn = false;
  toggleState() {
    const bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  ngAfterViewInit() {
    InitJsService.initMenu();
    InitJsService.initMobileMenu();
  }

  defineIsFooterDark() {
    this.isDarkFooter = false;
    let arrRoute = this.router.url.split('/');
    let lastRouteName = arrRoute[arrRoute.length -1];
    if (lastRouteName == 'gallery'){this.isDarkFooter = true; }
    if (lastRouteName == 'buy-a-pass'){this.isDarkFooter = true; }
    if (lastRouteName == 'groups'){this.isDarkFooter = true; }
    if (lastRouteName == 'activities'){this.isDarkFooter = true; }
    if (lastRouteName == 'waiver'){this.isDarkFooter = true; }
  }

  setLocationById(id: any) {
    this.service.setActiveLocationId(id);
    this.activeLocationId = this.service.getActiveLocationId();
  }

  ngDoCheck() {
    if (!this.activeLocationId) {
      if (this.activeLocationId != this.service.activeLocationId) {
        this.activeLocationId = this.service.activeLocationId;
      }
    }
    if (this.service.activeLocationId) {
      if (this.service.contactInfoOfFooter) {
        if (this.service.contactInfoOfFooter[this.service.activeLocationId] ) {
          this.amenities = JSON.parse(this.service.contactInfoOfFooter[this.service.activeLocationId].amenities);
          this.getActiveAmenities();
        }
      }
    }

    if(this.service.LIST_OF_LOCATIONS.length == 0 && this.locations.length > 0){
      this.service.setMapOfLoc(this.locations);
    }

    if(!this.isComingSoonChecked && this.service.LIST_OF_LOCATIONS.length > 0) {
      this.isComingSoon = this.service.isComingSoon();
      if(this.isComingSoon ){
         this.isComingSoonChecked = true;
         let url = this.activeLocationId + '/coming-soon';
         this.router.navigate([url])
      }
    }

  }

  getActiveAmenities(): void {
    this.isTrampoline = false;
    this.isEscape = false;
    this.isVr = false;
    for (let i = 0; i < this.amenities.length; i++) {
      if (+this.amenities[i] == 1) {
        this.isTrampoline = true;
      }
      if (+this.amenities[i] == 2) {
        this.isEscape = true;
      }
      if (+this.amenities[i] == 3) {
        this.isVr = true;
      }
    }
  }
}
