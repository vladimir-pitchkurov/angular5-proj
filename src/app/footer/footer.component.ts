import {AfterContentInit, AfterViewInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {LocationService} from '../services/location.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {LocationMap} from '../services/LocationMap';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  inputs: ['activeLocationId', 'isDarkFooter', 'locations']
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
  email_link: any[];
  allLinksCenteredge_waiver: any;
  allLinksCenteredge_tickets: any;


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
          this.email_link = [];
          this.activeLocationId = this.service.activeLocationId;
        }
      }

      const id = params['id'];

      this.activeLocationId = this.service.activeLocationId;

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

        this.service
          .getLocationCustomPricingById(this.activeLocationId, '/field/email')
          .then((result: any[]) => {
            this.email_link = result;
          });

        this.service
          .getLocationLinksCenteredge_waiver( this.activeLocationId )
          .then((data) => {
            this.allLinksCenteredge_waiver = data;
          });

        this.service
          .getLocationLinksByField( this.activeLocationId, 'centeredge_tickets' )
          .then((data) => {
            this.allLinksCenteredge_tickets = data;
          });

      }

    });
  }

  ngOnChanges(): void {

    if (this.activeLocationId == undefined ) {
      this.activeLocationId = this.service.activeLocationId;
    }

    if (this.activeLocationId) {
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


      this.service
        .getLocationCustomPricingById(this.activeLocationId, '/field/email')
        .then((result: any[]) => {
          this.email_link = result;
        });
      this.service.setEmail(this.email_link);

      this.service
        .getLocationLinksCenteredge_waiver( this.activeLocationId )
        .then((data) => {
          this.allLinksCenteredge_waiver = data;
        });
      this.service.setAllLinksCenteredge_waiver( this.allLinksCenteredge_waiver );

      this.service
        .getLocationLinksByField( this.activeLocationId, 'centeredge_tickets' )
        .then((data) => {
          this.allLinksCenteredge_tickets = data;
        });
      this.service.setAllLinksCenteredge_tickets( this.allLinksCenteredge_tickets );

    }

  }

  ngDoCheck() {

    if (this.activeLocationId  ) {

        this.service.setContactInf(this.locationInf);

        this.service.setInfSocialFacebook(this.facebook_link);

        this.service.setInfSocialTwitter(this.twitter_link);

        this.service.setInfSocialInstagram(this.instagram_link);

        this.service.setInfSocialGoogle(this.google_link);

        this.service.setEmail(this.email_link);

        this.service.setAllLinksCenteredge_waiver( this.allLinksCenteredge_waiver );

        this.service.setAllLinksCenteredge_tickets( this.allLinksCenteredge_tickets );

    }
  }

}
