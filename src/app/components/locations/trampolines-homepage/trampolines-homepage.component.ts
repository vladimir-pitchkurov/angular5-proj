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
export class TrampolinesHomepageComponent implements OnInit, DoCheck {

  locationHours: any;
  locationInf: any;
  activeLocationId: any;
  locationPricings: any;
  locationDeals: any;


  constructor(private route: Router
    , private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , private service: LocationService) {
  }

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
          .then(result => this.locationHours = result);
        this.service.setLocationHours(this.locationHours);
      }

      if (!this.service.contactInfoOfFooter[this.activeLocationId]) {
        this.service
          .getLocationById(id)
          .then(result => this.locationInf = result);
      }

      if (!this.service.locationPricings[this.activeLocationId] && !this.locationPricings) {
        this.service
          .getLocationPricing(id)
          .then(result => this.locationPricings = result);
      }

      if (this.locationPricings && !this.service.locationPricings[this.activeLocationId]) {
        this.service.setLocationPricings(this.locationPricings);
      }

      if (!this.service.locationDeals[this.activeLocationId] && !this.locationDeals) {
        this.service
          .getLocationDeals(id)
          .then(result => this.locationDeals = result);
      }
      if (this.locationDeals) {
        this.service.setLocationDeals(this.locationDeals);
      }

    });
  }


  ngDoCheck() {
    if (this.activeLocationId !== this.service.activeLocationId) {
      this.service.activeLocationId = this.activeLocationId;
    }

    if (!this.service.locationHours[this.activeLocationId]) {
      if (!this.service.locationHours[this.activeLocationId] && !this.locationHours) {
        this.service
          .getLocationHours(this.activeLocationId)
          .then(result => this.locationHours = result);
      }
      if (!this.service.locationHours[this.activeLocationId] && this.locationHours) {
        if (this.locationHours.length > 0) {
          this.service.setLocationHours(this.locationHours);
        }
      }
    }

    if (!this.service.locationPricings[this.activeLocationId] && !this.locationPricings) {
      this.service
        .getLocationPricing(this.activeLocationId)
        .then(result => {
          this.locationPricings = result;
        });
    }
    if (!this.service.locationPricings[this.activeLocationId] && this.locationPricings) {
      if (this.locationPricings.length > 0) {
        this.service.setLocationPricings(this.locationPricings);
      }

    }

    if (!this.service.locationDeals[this.activeLocationId] && !this.locationDeals) {
      this.service
        .getLocationDeals(this.activeLocationId)
        .then(result => {
          this.locationDeals = result;
        });
    }
    if (!this.service.locationDeals[this.activeLocationId] && this.locationDeals) {
      if (this.locationDeals.length > 0) {
        this.service.setLocationDeals(this.locationDeals);
      }
    }


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
