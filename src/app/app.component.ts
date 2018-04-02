import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {InitJsService} from './services/init-js.service';
import {NavigationEnd, Router} from '@angular/router';
import {LocationService} from './services/location.service';
import {LocationMap} from './services/LocationMap';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, DoCheck {
  title = 'app';
  locations: LocationMap[];
  activeLocationId: any;
  locationInf: any[];
  isDarkFooter = false;
  amenities = [];
  isTrampoline = true;
  isEscape = true;
  isVr = true;

  constructor(private router: Router
    , private service: LocationService) {
  }

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
    });
    this.locations = this.service.getLocationMap();
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
    const pagesWithDarkFooter: string[] = [
      '/escape-room',
      'trampoline-parties'
    ];
    this.isDarkFooter = pagesWithDarkFooter.indexOf(this.router.url) !== -1 || this.router.url.indexOf('/blog/') !== -1;
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

export const activeAttract: any = {
  trampoline: false,
  escape: false,
  vr: false
};
