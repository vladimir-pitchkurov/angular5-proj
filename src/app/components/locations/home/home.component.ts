import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Title} from '@angular/platform-browser';
import {LocationService} from '../../../services/location.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLeftVisible = 0;
  boolChanged = false;
  activeLocationId: any;
  locationInf: any;
  isDisplayed: boolean;
  isEscapeRoomDisplayed: boolean;
  comingSoonFeatures: any;
  availableSlides: any[] = [];
  amenities = [];
  currentCity: any = {};
  allLocationListener: any;
  currentSlide = 0;

  constructor(private route: Router
    , private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , public service: LocationService) {
  }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {

      let id = params["id"];
      this.activeLocationId = id;
      this.service.activeLocationId = this.activeLocationId;

      let currLocId = id;

      if(this.service.LIST_OF_LOCATIONS.length)
      {
        this.loadFeatures(currLocId);
      }
      else {
        this.listenToAllLocationsLoaded(currLocId);
      }

      if (!this.service.contactInfoOfFooter[this.activeLocationId]) {
        if (this.service.getIdByName(this.activeLocationId)) {

          this.service
            .getLocationById(id)
            .then((result) => {
              this.locationInf = result;
              this.service.setLocationInformation(this.locationInf);
            });
        }
      }
    });

    setInterval(() => {

    }, 3000);

    this.titleService.setTitle('Adrenaline Entertainment Centers');
    this.meta.addTag({name: 'meta-description', content: 'description'});



    this.isDisplayed = this.display();
    this.isEscapeRoomDisplayed = this.displayEscapeRooms();

  }

  display() : boolean {
    return this.activeLocationId == 'cincinnati';
  }

  displayEscapeRooms(): boolean {
    return this.activeLocationId == 'york';
  }

  loadFeatures(id: any)
  {
    this.service.loadFeatures(id)
      .then(data => {

        this.comingSoonFeatures = data;

        this.availableSlides = this.comingSoonFeatures.map(el => el.category);

        this.currentCity = JSON.parse(localStorage.getItem('all-locations')).find(city => city.slug == id);

        this.runSlider();
      })
  }

  listenToAllLocationsLoaded(currLocId)
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.loadFeatures(currLocId);
    })
  }

  runSlider ()
  {
    setTimeout(()=>{
      let slides = document.querySelectorAll('#slides .slide');
      let buttonSlides = document.querySelectorAll('#buttonSlides .buttonSlide');

      let nextSlide = () => {
        slides[this.currentSlide].className = 'slide';
        buttonSlides[this.currentSlide].className = 'gaiety-button my-auto col-3 buttonSlide';
        this.currentSlide = (this.currentSlide+1)%slides.length;
        slides[this.currentSlide].className = 'slide showing';
        buttonSlides[this.currentSlide].className = 'gaiety-button my-auto col-3 buttonSlide green-light';
      };

      let slideInterval = setInterval(nextSlide,3000);
    }, 0);
  }

  ngDoCheck() {
    if (this.activeLocationId !== this.service.activeLocationId){
      this.service.activeLocationId = this.activeLocationId;
    }
    if (this.service.activeLocationId) {
      if (this.service.contactInfoOfFooter) {
        if (this.service.contactInfoOfFooter[this.service.activeLocationId] ) {
          this.amenities = JSON.parse(this.service.contactInfoOfFooter[this.service.activeLocationId].amenities);

        }
      }
    }
  }

  setSlide(slide: number){

    let slides = document.querySelectorAll('#slides .slide');
    let buttonSlides = document.querySelectorAll('#buttonSlides .buttonSlide');

      slides[this.currentSlide].className = 'slide';
      buttonSlides[this.currentSlide].className = 'gaiety-button my-auto col-3 buttonSlide';
      slides[slide].className = 'slide showing';
      buttonSlides[slide].className = 'gaiety-button my-auto col-3 buttonSlide green-light';

  }

}
