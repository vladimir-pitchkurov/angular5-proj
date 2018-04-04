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
  facebook_link: any[];
  twitter_link: any[];
  instagram_link: any[];
  google_link: any[];
  email_link: any[];
  allLinksCenteredge_waiver: any;
  allLinksCenteredge_tickets: any;


  constructor(private service: LocationService
    , private route: Router
    , private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {

    this.activatedRoute.params.forEach((params: Params) => {

      this.activeLocationId = this.service.activeLocationId;

      if (this.activeLocationId) {

        if (!this.service.contactInfoOfFooter[this.service.activeLocationId] && !this.locationInf) {
          this.service.getLocationById(this.activeLocationId)
            .then((data: any[]) => {
              this.locationInf = data;
            });
        }
        if (!this.service.contactInfoOfFooter[this.service.activeLocationId] && this.locationInf) {
          this.service.setContactInf(this.locationInf);
        }

        if (!this.service.infSocialOfFooterFacebook[this.activeLocationId] && !this.facebook_link) {
          this.service.getLocationSocialByName(this.activeLocationId, 'facebook')
            .then((data: any[]) => {
              this.facebook_link = data;
            });
        }
        if (!this.service.infSocialOfFooterFacebook[this.activeLocationId]) {
          this.service.setInfSocialFacebook(this.facebook_link);
        }


        if (!this.service.infSocialOfFooterTwitter[this.activeLocationId] && !this.twitter_link) {
          this.service.getLocationSocialByName(this.activeLocationId, 'twitter')
            .then((data: any[]) => {
              this.twitter_link = data;
            });
        }
        if (!this.service.infSocialOfFooterTwitter[this.activeLocationId]) {
          this.service.setInfSocialTwitter(this.twitter_link);
        }


        if (!this.service.infSocialOfFooterInstagram[this.activeLocationId] && !this.instagram_link) {
          this.service.getLocationSocialByName(this.activeLocationId, 'instagram')
            .then((data: any[]) => {
              this.instagram_link = data;
            });
        }
        if (!this.service.infSocialOfFooterInstagram[this.activeLocationId]) {
          this.service.setInfSocialInstagram(this.instagram_link);
        }


        if (!this.service.infSocialOfFooterGoogle[this.activeLocationId] && !this.google_link) {
          this.service.getLocationSocialByName(this.activeLocationId, 'google')
            .then((data: any[]) => {
              this.google_link = data;
            });
        }
        if (!this.service.infSocialOfFooterGoogle[this.activeLocationId]) {
          this.service.setInfSocialGoogle(this.google_link);
        }


        if (!this.service.footerEmail[this.activeLocationId] && !this.email_link) {
          this.service
            .getLocationCustomPricingById(this.activeLocationId, '/field/email')
            .then((result: any[]) => {
              this.email_link = result;
            });
        }
        if (!this.service.footerEmail[this.activeLocationId]) {
          this.service.setEmail(this.email_link);
        }

        if (!this.service.allLinksCenteredge_waiver[this.activeLocationId] && !this.allLinksCenteredge_waiver) {
          this.service
            .getLocationLinksCenteredge_waiver(this.activeLocationId)
            .then((data) => {
              this.allLinksCenteredge_waiver = data;
            });
        }
        if (!this.service.allLinksCenteredge_waiver[this.activeLocationId]) {
          this.service.setAllLinksCenteredge_waiver(this.allLinksCenteredge_waiver);
        }

        if (!this.service.allLinksCenteredge_tickets[this.activeLocationId] && !this.allLinksCenteredge_tickets) {
          this.service
            .getLocationLinksByField(this.activeLocationId, 'centeredge_tickets')
            .then((data) => {
              this.allLinksCenteredge_tickets = data;
            });
        }
        if (!this.service.allLinksCenteredge_tickets[this.activeLocationId]) {
          this.service.setAllLinksCenteredge_tickets(this.allLinksCenteredge_tickets);
        }
      }

    });
  }

  ngOnChanges(): void {

    if (this.activeLocationId == undefined) {
      this.activeLocationId = this.service.activeLocationId;
    }

    if (this.activeLocationId) {


      if (!this.service.contactInfoOfFooter[this.service.activeLocationId] && !this.locationInf) {
        this.service.getLocationById(this.activeLocationId)
          .then((data: any[]) => {
            this.locationInf = data;
          });
      }
      if (!this.service.contactInfoOfFooter[this.service.activeLocationId] && this.locationInf) {
        this.service.setContactInf(this.locationInf);
      }

      if (!this.service.infSocialOfFooterFacebook[this.activeLocationId] && !this.facebook_link) {
        this.service.getLocationSocialByName(this.activeLocationId, 'facebook')
          .then((data: any[]) => {
            this.facebook_link = data;
          });
      }
      if (!this.service.infSocialOfFooterFacebook[this.activeLocationId] && this.facebook_link) {
        this.service.setInfSocialFacebook(this.facebook_link);
      }


      if (!this.service.infSocialOfFooterTwitter[this.activeLocationId] && !this.twitter_link) {
        this.service.getLocationSocialByName(this.activeLocationId, 'twitter')
          .then((data: any[]) => {
            this.twitter_link = data;
          });
      }
      if (!this.service.infSocialOfFooterTwitter[this.activeLocationId] && this.twitter_link) {
        this.service.setInfSocialTwitter(this.twitter_link);
      }


      if (!this.service.infSocialOfFooterInstagram[this.activeLocationId] && !this.instagram_link) {
        this.service.getLocationSocialByName(this.activeLocationId, 'instagram')
          .then((data: any[]) => {
            this.instagram_link = data;
          });
      }
      if (!this.service.infSocialOfFooterInstagram[this.activeLocationId] && this.instagram_link) {
        this.service.setInfSocialInstagram(this.instagram_link);
      }


      if (!this.service.infSocialOfFooterGoogle[this.activeLocationId] && !this.google_link) {
        this.service.getLocationSocialByName(this.activeLocationId, 'google')
          .then((data: any[]) => {
            this.google_link = data;
          });
      }
      if (!this.service.infSocialOfFooterGoogle[this.activeLocationId] && this.google_link) {
        this.service.setInfSocialGoogle(this.google_link);
      }


      if (!this.service.footerEmail[this.activeLocationId] && !this.email_link) {
        this.service
          .getLocationCustomPricingById(this.activeLocationId, '/field/email')
          .then((result: any[]) => {
            this.email_link = result;
          });
      }
      if (!this.service.footerEmail[this.activeLocationId] && this.email_link) {
        this.service.setEmail(this.email_link);
      }

      if (!this.service.allLinksCenteredge_waiver[this.activeLocationId] && !this.allLinksCenteredge_waiver) {
        this.service
          .getLocationLinksCenteredge_waiver(this.activeLocationId)
          .then((data) => {
            this.allLinksCenteredge_waiver = data;
          });
      }
      if (!this.service.allLinksCenteredge_waiver[this.activeLocationId] && this.allLinksCenteredge_waiver) {
        this.service.setAllLinksCenteredge_waiver(this.allLinksCenteredge_waiver);
      }

      if (!this.service.allLinksCenteredge_tickets[this.activeLocationId] && !this.allLinksCenteredge_tickets) {
        this.service
          .getLocationLinksByField(this.activeLocationId, 'centeredge_tickets')
          .then((data) => {
            this.allLinksCenteredge_tickets = data;
          });
      }
      if (!this.service.allLinksCenteredge_tickets[this.activeLocationId] && this.allLinksCenteredge_tickets) {
        this.service.setAllLinksCenteredge_tickets(this.allLinksCenteredge_tickets);
      }

    }

  }

  ngDoCheck() {

    if (this.activeLocationId != undefined) {

      if (!this.service.contactInfoOfFooter[this.service.activeLocationId] && this.locationInf ) {
        if (this.locationInf.length > 0) {
          this.service.setContactInf(this.locationInf);
        }
      }

      if (!this.service.infSocialOfFooterFacebook[this.activeLocationId] && this.facebook_link) {
        if (this.facebook_link.length > 0) {
          this.service.setInfSocialFacebook(this.facebook_link);
        }
      }


      if (!this.service.infSocialOfFooterTwitter[this.activeLocationId] && this.twitter_link) {
        if (this.twitter_link.length > 0) {
          this.service.setInfSocialTwitter(this.twitter_link);
        }
      }

      if (!this.service.infSocialOfFooterInstagram[this.activeLocationId] && this.instagram_link) {
        if (this.instagram_link.length > 0) {
          this.service.setInfSocialInstagram(this.instagram_link);
        }
      }


      if (!this.service.infSocialOfFooterGoogle[this.activeLocationId] && this.google_link) {
        if (this.google_link.length > 0) {
          this.service.setInfSocialGoogle(this.google_link);
        }
      }


      if (!this.service.footerEmail[this.activeLocationId] && this.email_link) {
        if (this.email_link.length > 0) {
          this.service.setEmail(this.email_link);
        }
      }


      if (!this.service.allLinksCenteredge_waiver[this.activeLocationId] && this.allLinksCenteredge_waiver) {
        if (this.allLinksCenteredge_waiver.length > 0) {
          this.service.setAllLinksCenteredge_waiver(this.allLinksCenteredge_waiver);
        }
      }


      if (!this.service.allLinksCenteredge_tickets[this.activeLocationId] && this.allLinksCenteredge_tickets) {
        if (this.allLinksCenteredge_tickets.length > 0) {
          this.service.setAllLinksCenteredge_tickets(this.allLinksCenteredge_tickets);
        }
      }

      if (!this.service.locationInformation[this.activeLocationId] && this.locationInf) {
        if (this.locationInf.length > 0) {
          this.service.setLocationInformation(this.locationInf);
        }
      }
    }

  }

}
