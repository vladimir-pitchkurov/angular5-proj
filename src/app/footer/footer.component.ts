import {Component, OnChanges, OnInit} from '@angular/core';
import {LocationService} from "../services/location.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  inputs: ['activeLocationId', 'isDarkFooter']
})
export class FooterComponent implements OnInit, OnChanges {

  isDarkFooter = false;
  activeLocationId: any;
  facebook_link: any[];
  twitter_link: any[];
  instagram_link: any[];
  google_link: any[];
  locationInf: any[];
  socialInf: any[];

  constructor(private service: LocationService) {  }

  ngOnInit() {
    this.service.getLocationById(this.activeLocationId)
      .then((data: any[]) => {
        this.locationInf = data;
      });

    this.service.getLocationSocial(this.activeLocationId)
      .then((data: any[]) => {
        this.socialInf = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'facebook')
      .then((data: any[]) => {
        this.facebook_link = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'twitter')
      .then((data: any[]) => {
        this.twitter_link = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'instagram')
      .then((data: any[]) => {
        this.instagram_link = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'google')
      .then((data: any[]) => {
        this.google_link = data;
      });
  }


  ngOnChanges(): void {
    this.service.getLocationById(this.activeLocationId)
      .then((data: any[]) => {
        this.locationInf = data;
      });

    this.service.getLocationSocial(this.activeLocationId)
      .then((data: any[]) => {
        this.socialInf = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'facebook')
      .then((data: any[]) => {
        this.facebook_link = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'twitter')
      .then((data: any[]) => {
        this.twitter_link = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'instagram')
      .then((data: any[]) => {
        this.instagram_link = data;
      });

    this.service.getLocationSocialByName(this.activeLocationId, 'google')
      .then((data: any[]) => {
        this.google_link = data;
      });
  }
}
