import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LocationService} from "../../../services/location.service";

@Component({
    selector: 'app-coming-soon',
    templateUrl: './coming-soon.component.html',
    styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit, DoCheck, OnDestroy {

    isLeftVisible = 0;
    boolChanged = false;
    activeLocationId: any;
    locationInf: any;
    validation_msg: any;
    amenities = [];
    isTrampoline = true;
    isEscape = true;
    isVr = true;
    comingSoonFeatures: any;
    availableSlides: any[] = [];
    currentCity: any = {};
    allLocationListener: any;


    constructor(private route: Router
      , private activatedRoute: ActivatedRoute
      , private meta: Meta
      , private titleService: Title
      , public service: LocationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Coming Soon! Adrenaline Entertainment Centers');

      this.activatedRoute.params.forEach((params: Params) => {
        let id = params["id"]; this.activeLocationId = id;
        this.service.activeLocationId = this.activeLocationId;

        let currLocId = id;

        if(this.service.LIST_OF_LOCATIONS.length)
        {
          this.loadFeatures(currLocId);
        }
        else {
          this.listenToAllLocationsLoaded(currLocId);
        }
      });
      setInterval(() => {
        if (!this.boolChanged) {
          this.isLeftVisible++;
          if (this.isLeftVisible == 3) {
            this.isLeftVisible = 0;
          }
        }
      }, 3000);
    }

  listenToAllLocationsLoaded(currLocId)
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.loadFeatures(currLocId);
    })
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

  sendPostComing(id, userPhone) {
    let data = new FormData();
    data.append('location_id', id);
    data.append('phone', userPhone);
    this.service
      .sendPostComing(data)
      .then(result => {
        this.validation_msg = result;
      });
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


  runSlider ()
  {
    setTimeout(()=>{
      let slides = document.querySelectorAll('#slides .slide');
      let currentSlide = 0;

      let nextSlide = () => {
        slides[currentSlide].className = 'slide';
        currentSlide = (currentSlide+1)%slides.length;
        slides[currentSlide].className = 'slide showing';
      };

      let slideInterval = setInterval(nextSlide,3000);
    }, 0);
  }


  ngOnDestroy ()
  {
    if(this.allLocationListener) {
      this.allLocationListener.unsubscribe();
    }
  }
}
