import {AfterContentInit, AfterViewInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {LocationService} from '../services/location.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  inputs: ['activeLocationId', 'isDarkFooter']
})
export class FooterComponent implements OnInit, OnChanges, DoCheck {

  isDarkFooter = false;
  activeLocationId: any;

  locationInf: any[];
  socialInf: any[];

  facebook_link: any[];
  twitter_link: any[];
  instagram_link: any[];
  google_link: any[];


  constructor(private service: LocationService
    , private route: Router
    , private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {

    this.activatedRoute.params.forEach((params: Params) => {

      if (!this.activeLocationId || isNullOrUndefined(this.activeLocationId) ) {
        if (this.activeLocationId !== this.service.activeLocationId) {
          this.facebook_link = [];
          this.twitter_link = [];
          this.instagram_link = [];
          this.google_link = [];
          this.locationInf = [];
          this.socialInf = [];
          this.activeLocationId = this.service.activeLocationId;
        }
      }

      const id = params['id']; this.activeLocationId = this.service.activeLocationId;

      if (this.activeLocationId) {

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

    });
  }

  ngOnChanges(): void {

    if(this.activeLocationId == undefined ) {
      this.activeLocationId = this.service.activeLocationId;
    }

    if(this.activeLocationId){
      this.service.getLocationById(this.activeLocationId)
        .then((data: any[]) => {
          this.locationInf = data;
        });
      this.service.setContactInf(this.locationInf);


      this.service.getLocationSocial(this.activeLocationId)
        .then((data: any[]) => {
          this.socialInf = data;
        });
      this.service.setContactInf(this.locationInf);


      this.service.getLocationSocialByName(this.activeLocationId, 'facebook')
        .then((data: any[]) => {
          this.facebook_link = data;
        });
      this.service.setInfSocialFacebook(this.facebook_link);


      this.service.getLocationSocialByName(this.activeLocationId, 'twitter')
        .then((data: any[]) => {
          this.twitter_link = data;
        });
      this.service.setInfSocialTwitter(this.twitter_link);


      this.service.getLocationSocialByName(this.activeLocationId, 'instagram')
        .then((data: any[]) => {
          this.instagram_link = data;
        });
      this.service.setInfSocialInstagram(this.instagram_link);


      this.service.getLocationSocialByName(this.activeLocationId, 'google')
        .then((data: any[]) => {
          this.google_link = data;
        });
      this.service.setInfSocialGoogle(this.google_link);

    }

  }

  ngDoCheck() {


    if (this.activeLocationId  ) {

      this.service.setContactInf(this.locationInf);

    }

    if (!this.service.infSocialOfFooterFacebook[this.activeLocationId] && this.activeLocationId) {
      this.service.setInfSocialFacebook(this.facebook_link);
    }

    if (!this.service.infSocialOfFooterTwitter[this.activeLocationId] && this.activeLocationId) {
      this.service.setInfSocialTwitter(this.twitter_link);
    }

    if (!this.service.infSocialOfFooterTwitter[this.activeLocationId] && this.activeLocationId) {
      this.service.setInfSocialInstagram(this.instagram_link);
    }

    if (!this.service.infSocialOfFooterGoogle[this.activeLocationId] && this.activeLocationId) {
      this.service.setInfSocialGoogle(this.google_link);
    }

  }

}
