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
export class FooterComponent implements OnInit, OnChanges {

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
  locationTitles: any;
  locationDesc: any;
  locationHours: any;


  constructor(private service: LocationService
    , private route: Router
    , private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {

    this.activatedRoute.params.forEach((params: Params) => {

      this.activeLocationId = this.service.activeLocationId;

      if (this.activeLocationId && this.activeLocationId != "undefined") {

        if (!this.service.locationHours[this.activeLocationId]) {
          this.service
            .getLocationHours(this.activeLocationId)
            .then((result) => {
              this.locationHours = result;
              this.service.setLocationHours( this.locationHours );
            });
        }

        if(!this.service.locationDesc[this.activeLocationId] && !this.locationDesc ) {
          this.service.getLocationDesc(this.activeLocationId)
            .then((data:any) => {
              this.locationDesc = data;
              this.service.setLocationDesc(this.locationDesc);
            })
        }


        if(!this.service.locationTitles[this.activeLocationId] && !this.locationTitles){
          this.service.getLocationTitles(this.activeLocationId)
            .then((data:any) =>{
              this.locationTitles = data;
              this.service.setLocationTitles(this.locationTitles);
            });
        }


        if (!this.service.contactInfoOfFooter[this.service.activeLocationId] && !this.locationInf) {
          this.service.getLocationById(this.activeLocationId)
            .then((data: any[]) => {
              this.locationInf = data;
              this.service.setContactInf(this.locationInf);
            });
        }


        if (!this.service.infSocialOfFooterFacebook[this.activeLocationId] && !this.facebook_link) {
          this.service.getLocationSocialByName(this.activeLocationId, 'facebook')
            .then((data: any[]) => {
              this.facebook_link = data;
              this.service.setInfSocialFacebook(this.facebook_link);
            });
        }


        if (!this.service.infSocialOfFooterTwitter[this.activeLocationId] && !this.twitter_link) {
          this.service.getLocationSocialByName(this.activeLocationId, 'twitter')
            .then((data: any[]) => {
              this.twitter_link = data;
              this.service.setInfSocialTwitter(this.twitter_link);
            });
        }


        if (!this.service.infSocialOfFooterInstagram[this.activeLocationId] && !this.instagram_link) {
          this.service.getLocationSocialByName(this.activeLocationId, 'instagram')
            .then((data: any[]) => {
              this.instagram_link = data;
              this.service.setInfSocialInstagram(this.instagram_link);
            });
        }



        if (!this.service.infSocialOfFooterGoogle[this.activeLocationId] && !this.google_link) {
          this.service.getLocationSocialByName(this.activeLocationId, 'google')
            .then((data: any[]) => {
              this.google_link = data;
              this.service.setInfSocialGoogle(this.google_link);
            });
        }


        if (!this.service.footerEmail[this.activeLocationId] && !this.email_link) {
          this.service
            .getLocationCustomPricingById(this.activeLocationId, '/field/email')
            .then((result: any[]) => {
              this.email_link = result;
              this.service.setEmail(this.email_link);
            });
        }


        if (!this.service.allLinksCenteredge_waiver[this.activeLocationId] && !this.allLinksCenteredge_waiver) {
          this.service
            .getLocationLinksCenteredge_waiver(this.activeLocationId)
            .then((data) => {
              this.allLinksCenteredge_waiver = data;
              this.service.setAllLinksCenteredge_waiver(this.allLinksCenteredge_waiver);
            });
        }


        if (!this.service.allLinksCenteredge_tickets[this.activeLocationId] && !this.allLinksCenteredge_tickets) {
          this.service
            .getLocationLinksByField(this.activeLocationId, 'centeredge_tickets')
            .then((data) => {
              this.allLinksCenteredge_tickets = data;
              this.service.setAllLinksCenteredge_tickets(this.allLinksCenteredge_tickets);
            });
        }

      }

    });
  }

  ngOnChanges(): void {

    if (this.activeLocationId == undefined && this.activeLocationId != "undefined") {
      this.activeLocationId = this.service.activeLocationId;
    }

    if (this.activeLocationId && this.activeLocationId != "undefined") {

      if (!this.service.locationHours[this.activeLocationId]) {
        this.service
          .getLocationHours(this.activeLocationId)
          .then((result) => {
            this.locationHours = result;
            this.service.setLocationHours( this.locationHours );
          });
      }


      if (!this.service.contactInfoOfFooter[this.service.activeLocationId] && !this.locationInf) {
        this.service.getLocationDesc(this.activeLocationId)
          .then((data:any) => {
            this.locationDesc = data;
            this.service.setLocationDesc(this.locationDesc);
          })
      }


      if(!this.service.locationTitles[this.activeLocationId] && !this.locationTitles){
        this.service.getLocationTitles(this.activeLocationId)
          .then((data:any) =>{
            this.locationTitles = data;
            this.service.setLocationTitles(this.locationTitles);
          });
      }


      if (!this.service.contactInfoOfFooter[this.service.activeLocationId] && !this.locationInf) {
        this.service.getLocationById(this.activeLocationId)
          .then((data: any[]) => {
            this.locationInf = data;
            this.service.setContactInf(this.locationInf);
          });
      }


      if (!this.service.infSocialOfFooterFacebook[this.activeLocationId] && !this.facebook_link) {
        this.service.getLocationSocialByName(this.activeLocationId, 'facebook')
          .then((data: any[]) => {
            this.facebook_link = data;
            this.service.setInfSocialFacebook(this.facebook_link);
          });
      }


      if (!this.service.infSocialOfFooterTwitter[this.activeLocationId] && !this.twitter_link) {
        this.service.getLocationSocialByName(this.activeLocationId, 'twitter')
          .then((data: any[]) => {
            this.twitter_link = data;
            this.service.setInfSocialTwitter(this.twitter_link);
          });
      }


      if (!this.service.infSocialOfFooterInstagram[this.activeLocationId] && !this.instagram_link) {
        this.service.getLocationSocialByName(this.activeLocationId, 'instagram')
          .then((data: any[]) => {
            this.instagram_link = data;
            this.service.setInfSocialInstagram(this.instagram_link);
          });
      }



      if (!this.service.infSocialOfFooterGoogle[this.activeLocationId] && !this.google_link) {
        this.service.getLocationSocialByName(this.activeLocationId, 'google')
          .then((data: any[]) => {
            this.google_link = data;
            this.service.setInfSocialGoogle(this.google_link);
          });
      }


      if (!this.service.footerEmail[this.activeLocationId] && !this.email_link) {
        this.service
          .getLocationCustomPricingById(this.activeLocationId, '/field/email')
          .then((result: any[]) => {
            this.email_link = result;
            this.service.setEmail(this.email_link);
          });
      }


      if (!this.service.allLinksCenteredge_waiver[this.activeLocationId] && !this.allLinksCenteredge_waiver) {
        this.service
          .getLocationLinksCenteredge_waiver(this.activeLocationId)
          .then((data) => {
            this.allLinksCenteredge_waiver = data;
            this.service.setAllLinksCenteredge_waiver(this.allLinksCenteredge_waiver);
          });
      }


      if (!this.service.allLinksCenteredge_tickets[this.activeLocationId] && !this.allLinksCenteredge_tickets) {
        this.service
          .getLocationLinksByField(this.activeLocationId, 'centeredge_tickets')
          .then((data) => {
            this.allLinksCenteredge_tickets = data;
            this.service.setAllLinksCenteredge_tickets(this.allLinksCenteredge_tickets);
          });
      }
    }
  }
}
