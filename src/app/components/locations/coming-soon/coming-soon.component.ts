import {Component, DoCheck, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LocationService} from "../../../services/location.service";

@Component({
    selector: 'app-coming-soon',
    templateUrl: './coming-soon.component.html',
    styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit, DoCheck {

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

    constructor(private route: Router
      , private activatedRoute: ActivatedRoute
      , private meta: Meta
      , private titleService: Title
      , private service: LocationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Coming Soon!Adrenaline Entertainment Centers');
        this.meta.addTag({ name: 'meta-keywords', content: 'coming keywords' });
        this.meta.addTag({ name: 'meta-description', content: 'Adrenaline Entertainment Centers is coming soon! Our trampoline parks, escape rooms, and virtual reality rooms are sure to entertain the entire family!' });

      this.activatedRoute.params.forEach((params: Params) => {
        let id = params["id"]; this.activeLocationId = id;
        this.service.activeLocationId = this.activeLocationId;

        this.loadFeatures(id);
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

      let slideInterval = setInterval(nextSlide,2000);
    }, 0);
  }

}
