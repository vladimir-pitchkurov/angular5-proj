import {Component, DoCheck, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-trampolines-homepage',
  templateUrl: './trampolines-homepage.component.html',
  styleUrls: ['./trampolines-homepage.component.css']
})
export class TrampolinesHomepageComponent implements OnInit {

  locationHours: any;
  locationInf: any;
  activeLocationId: any;
  locationPricings: any;
  locationDeals: any;


  constructor(private route: Router
    , private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , private service: LocationService) { }

  ngOnInit() {

    this.titleService.setTitle('GrTrampolines Homepageoups');
    this.meta.addTag({name: 'meta-description', content: 'Trampolines Homepage description'});
    this.activatedRoute.params.forEach((params: Params) => {

       let id = params['id'];
      this.activeLocationId = id;
      this.service.activeLocationId = this.activeLocationId;

      if (!this.service.locationHours[this.activeLocationId]) {
        this.service
          .getLocationHours(id)
          .then(result => {
            this.locationHours = result;
            this.service.setLocationHours(this.locationHours);
            console.log('this.locationHours', this.locationHours)
          })
          .catch();
      }

      if (!this.service.contactInfoOfFooter[this.activeLocationId]) {
        this.service
          .getLocationById(id)
          .then(result => {
            this.locationInf = result;
          })
          .catch();
      }

      if (!this.service.locationPricings[this.activeLocationId] && !this.locationPricings) {
        this.service
          .getLocationPricing(id)
          .then(result => {
            this.locationPricings = result;
            this.service.setLocationPricings(this.locationPricings);
          })
          .catch();
      }

      if (!this.service.locationDeals[this.activeLocationId] && !this.locationDeals) {
        this.service
          .getLocationDeals(id)
          .then(result => {
            this.locationDeals = result;
            this.service.setLocationDeals(this.locationDeals);
          })
          .catch();
      }
    });
  }


  getOneHour() {
    if (this.service.locationPricings[this.service.activeLocationId]) {
      let arr = this.service.locationPricings[this.service.activeLocationId];
      for (let i = 0; i < arr.length; i++) {
        let iter = arr[i];
        if (iter.category == 'trampoline' && iter.name == 'general' && iter.label == 'one_hour') {
          return iter.price;
        }
      }

    }
    return '';
  }

  getTwoHours() {
    if (this.service.locationPricings[this.service.activeLocationId]) {
      let arr = this.service.locationPricings[this.service.activeLocationId];
      for (let i = 0; i < arr.length; i++) {
        let iter = arr[i];
        if (iter.category == 'trampoline' && iter.name == 'general' && iter.label == 'two_hour') {
          return iter.price;
        }
      }

    }
    return '';
  }

  get6Hours() {
    if (this.service.locationPricings[this.service.activeLocationId]) {
      let arr = this.service.locationPricings[this.service.activeLocationId];
      for (let i = 0; i < arr.length; i++) {
        let iter = arr[i];
        if (iter.category == 'trampoline' && iter.name == 'general' && iter.label == 'six_and_under') {
          return iter.price;
        }
      }

    }
    return '';
  }

}
