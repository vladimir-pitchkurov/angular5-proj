import {Component, DoCheck, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-trampolines-homepage',
  templateUrl: './trampolines-homepage.component.html',
  styleUrls: ['./trampolines-homepage.component.css']
})
export class TrampolinesHomepageComponent implements OnInit, DoCheck {

  locationHours: any;
  locationInf: any;
  activeLocationId: any;
  locationPricings: any;

    constructor( private route: Router
               , private activatedRoute: ActivatedRoute
               , private meta: Meta
               , private titleService: Title
               , private service: LocationService) { }

    ngOnInit() {
        this.titleService.setTitle('GrTrampolines Homepageoups');
        this.meta.addTag({ name: 'meta-description', content: 'Trampolines Homepage description' });

      this.activatedRoute.params.forEach((params: Params) => {

        let id = params["id"];
        this.activeLocationId = id;

        this.service.activeLocationId = this.activeLocationId;

        this.service
          .getLocationHours(id)
          .then(result => this.locationHours = result);

        this.service
          .getLocationById(id)
          .then(result => this.locationInf = result);

        this.service
          .getLocationPricing(id)
          .then( result => this.locationPricings = result);
        if(this.locationPricings){
          this.service.setLocationPricings(this.locationPricings);
        }

      });
    }

    getOneHour(){
      if(this.service.locationPricings[this.service.activeLocationId]){
        let arr = this.service.locationPricings[this.service.activeLocationId];
        for (let  i = 0; i < arr.length; i++) {
          let iter = arr[i];
          if( iter.category == "trampoline" && iter.name == "general" && iter.label == "one_hour" ){
               return iter.price;
          }
        }

      }
      return '';
    }

  getTwoHours(){
    if(this.service.locationPricings[this.service.activeLocationId]){
      let arr = this.service.locationPricings[this.service.activeLocationId];
      for (let  i = 0; i < arr.length; i++) {
        let iter = arr[i];
        if( iter.category == "trampoline" && iter.name == "general" && iter.label == "two_hour" ){
          return iter.price;
        }
      }

    }
    return '';
  }

  get6Hours(){
    if(this.service.locationPricings[this.service.activeLocationId]){
      let arr = this.service.locationPricings[this.service.activeLocationId];
      for (let  i = 0; i < arr.length; i++) {
        let iter = arr[i];
        if( iter.category == "trampoline" && iter.name == "general" && iter.label == "six_and_under" ){
          return iter.price;
        }
      }

    }
    return '';
  }

  getSocks(){
    if(this.service.locationPricings[this.service.activeLocationId]){
      let arr = this.service.locationPricings[this.service.activeLocationId];
      for (let  i = 0; i < arr.length; i++) {
        let iter = arr[i];
        if( iter.category == "trampoline" && iter.name == "apparel" && iter.label == "socks" ){
          return iter.price;
        }
      }

    }
    return '';
  }


    ngDoCheck(){
      if (this.activeLocationId  ){
        if(this.locationPricings && !this.service.locationPricings[this.service.activeLocationId]){
          this.service.setLocationPricings(this.locationPricings);
        }
      }
    }

}
