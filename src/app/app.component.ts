import {AfterViewInit, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {InitJsService} from './services/init-js.service';
import {NavigationEnd, Router} from '@angular/router';
import {LocationService} from './services/location.service';
import {Meta, Title} from '@angular/platform-browser';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {
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

  titleListener: any;
  locationTitles: any = {};

  allLocationListener: any;
  locationDescriptions: any = {};

  pageDescriptions: any;
  descriptionListener:any;

  isNewTitleSet: boolean = false;
  isNewMetaDescriptionSet: boolean = false;

  constructor( private router: Router
             , private titleService: Title
             , private meta: Meta
             , private service: LocationService ) { }

  ngOnInit() {

    this.listenToAllLocationsLoaded();
    this.listenToTitles();
    this.listenToDescription();

    this.activeLocationId = this.service.getActiveLocationId();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
      this.defineIsFooterDark();
      this.isNewTitleSet = false;
      this.isNewMetaDescriptionSet = false;

      this.setTitle();
      this.setPageMetaDescription();

      if (this.activeLocationId && !this.service.contactInfoOfFooter[this.activeLocationId]) {
        this.service.getLocationById(this.activeLocationId)
          .then((data: any[]) => {
            this.locationInf = data;
          });
      }

      this.service.getAllLocations()
        .then((data: any[]) => {
          this.locations = data;
          this.service.LIST_OF_LOCATIONS = this.locations;
        });

      if(this.service.LIST_OF_LOCATIONS.length == 0){

      }else {
        this.locations = this.service.LIST_OF_LOCATIONS;
      }

      if(this.service.LIST_OF_LOCATIONS.length == 0 && this.locations.length > 0){
        this.service.setMapOfLoc(this.locations);
      }
    });

  }


  ngOnDestroy()
  {
    this.titleListener.unsubscribe();
    this.allLocationListener.unsubscribe();
    this.descriptionListener.unsubscribe();
  }

  listenToTitles ()
  {
    this.titleListener = this.service.locationTitlesEmitter.subscribe(data => {
      this.locationTitles = data;
      this.setTitle();
    });
  }

  listenToDescription()
  {
    this.descriptionListener = this.service.locationDescriptionEmitter.subscribe(data => {
      this.pageDescriptions = data;
      this.setPageMetaDescription();
    });
  }

  listenToAllLocationsLoaded()
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.locations = data;
      this.loadPageDescriptions();
    })
  }


  loadPageDescriptions()
  {

    if (!this.activeLocationId) {
      return;
    }

    this.service.loadPageDescriptions(this.activeLocationId)
      .then(data => {
        this.pageDescriptions = data;
        this.setPageMetaDescription();
        this.setTitle();
      })
  }


  setPageMetaDescription ()
  {
    if (!this.activeLocationId || this.isNewMetaDescriptionSet || !this.pageDescriptions) {
      return;
    }

    let arrRoute = this.router.url.split('/');
    let lastRouteName = arrRoute[arrRoute.length -1];

    let descriptionProp = this.mapRouteToProps[lastRouteName];

    let description = this.pageDescriptions[descriptionProp] ? this.pageDescriptions[descriptionProp] : 'Adrenaline';

    let allLocationHomePageSlugs = this.service.LIST_OF_LOCATIONS.map(loc => loc.slug);

    description = allLocationHomePageSlugs.indexOf(lastRouteName) !== -1 ? this.pageDescriptions['HomeComponent'] : description;

      this.meta.updateTag({ name: 'meta-description', content: description });
      this.isNewMetaDescriptionSet = true;
  }


  setTitle()
  {
    if (!this.activeLocationId || this.isNewTitleSet || !Object.keys(this.locationTitles).length) {
      return;
    }

    let arrRoute = this.router.url.split('/');
    let lastRouteName = arrRoute[arrRoute.length -1];

    let titleProp = this.mapRouteToProps[lastRouteName];

    let title = this.locationTitles[titleProp] ? this.locationTitles[titleProp] : 'Adrenaline';

    let allLocationHomePageSlugs = this.service.LIST_OF_LOCATIONS.map(loc => loc.slug);

    title = allLocationHomePageSlugs.indexOf(lastRouteName) !== -1 ? this.locationTitles['HomeComponent'] : title;

    setTimeout(()=>{
      this.titleService.setTitle(title);
      this.isNewTitleSet = true;
    },0)
  }

  mapRouteToProps = {
    'about': 'AboutComponent',
    'activities': 'ActivitiesComponent',
    'coming-soon': 'ComingSoonComponent',
    'contact': 'ContactComponent',
    'gallery': 'GalleryComponent',
    'groups': 'GroupsComponent',
    'join-our-team': 'JoinourteamComponent',
    'trampoline-parties': 'PartiesComponent',
    'birthday-parties': 'PartiesComponent',
    'buy-a-pass': 'PassComponent',
    'rules': 'RulesComponent',
    'trampoline-park': 'TrampolinesHomepageComponent',
    'waiver': 'WaiverComponent',
    'escape-room': 'EscapeRoomComponent'
  };

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
    /*if (lastRouteName == 'columbia'){this.isDarkFooter = true; }
    if (lastRouteName == 'york'){this.isDarkFooter = true; }
    if (lastRouteName == 'lake-worth'){this.isDarkFooter = true; }
    if (lastRouteName == 'cincinnati'){this.isDarkFooter = true; }
    if (lastRouteName == 'lexington'){this.isDarkFooter = true; }*/
    for (let loc of this.locations){
      if(lastRouteName == loc.slug) {this.isDarkFooter = true; };
    }
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

    //  if(!this.isComingSoonChecked && this.service.LIST_OF_LOCATIONS.length > 0) {
    //    this.isComingSoon = this.service.isComingSoon();
    //    if(this.isComingSoon ){
    //      this.isComingSoonChecked = true;
    //      let url = this.activeLocationId + '/coming-soon';
    //      this.router.navigate([url])
    //   }
    // }

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
