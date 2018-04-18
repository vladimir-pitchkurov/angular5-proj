import {AfterContentInit, AfterViewInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {LocationService} from '../services/location.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {LocationMap} from '../services/LocationMap';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  inputs: ['activeLocationId', 'isDarkFooter', 'locations', 'isLocByPass']
})
export class FooterComponent implements OnInit, OnChanges {

  isDarkFooter = false;
  isLocByPass = false;
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
  locationPricings: any;
  locationDeals: any;
  one_hour: any;
  two_hours: any;
  a6_under: any;
  partiesPricingWeekday: any[];
  urlOfBirth: any;
  pricing: any;

  constructor(public service: LocationService
    , private route: Router
    , private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {


    this.activatedRoute.params.forEach((params: Params) => {

      this.activeLocationId = this.service.activeLocationId;

      if (this.activeLocationId && this.activeLocationId != 'undefined') {

        if (!this.service.locationHours[this.activeLocationId]) {
          this.service
            .getLocationHours(this.activeLocationId)
            .then((result) => {
              this.locationHours = result;
              this.service.setLocationHours(this.locationHours);
            });
        }

        if (!this.service.locationDesc[this.activeLocationId] && !this.locationDesc) {
          this.service.getLocationDesc(this.activeLocationId)
            .then((data: any) => {
              this.locationDesc = data;
              this.service.setLocationDesc(this.locationDesc);
            });
        }


        if (!this.service.locationTitles[this.activeLocationId] && !this.locationTitles) {
          this.service.getLocationTitles(this.activeLocationId)
            .then((data: any) => {
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

    if (this.activeLocationId == undefined && this.activeLocationId != 'undefined') {
      this.activeLocationId = this.service.activeLocationId;
    }

    if (this.activeLocationId && this.activeLocationId != 'undefined') {

      if (this.service.getIdByName(this.activeLocationId)) {

        if (!this.service.pricingTrampolineGroups[this.activeLocationId] && !this.pricing) {
          this.service
            .getLocationCustomPricingById(this.activeLocationId, '/pricing/trampoline/groups')
            .then(result => {
              this.pricing = result;
              this.service.setPricingTrampolineGroups(this.pricing);
            });
        }

        if (!this.service.pricingBirthday[this.activeLocationId] && !this.partiesPricingWeekday) {
          this.service
            .getLocationBirthdayParties('/birthday/variables')
            .then((result: any[]) => {
              this.partiesPricingWeekday = result;
              this.service.setPricingBirthday(this.partiesPricingWeekday);
            });
        }

        if (!this.service.pricingBirthdayUrl[this.activeLocationId] && !this.urlOfBirth) {
          this.service
            .getLocationBirthdayParties('/links/centeredge_events')
            .then((result) => {
              this.urlOfBirth = result;
              this.service.setUrlBirthday(this.urlOfBirth);
            });
        }

        if (!this.service.one_hour[this.activeLocationId] && !this.one_hour) {
          this.service
            .getLocationCustomPricingById(this.activeLocationId, '/pricing/trampoline/general/one_hour')
            .then((result) => {
              this.one_hour = result;
              this.service.setOne_hour(this.one_hour[0]);
            });
        }

        if (!this.service.two_hours[this.activeLocationId] && !this.two_hours) {
          this.service
            .getLocationCustomPricingById(this.activeLocationId, '/pricing/trampoline/general/two_hour')
            .then((result) => {
              this.two_hours = result;
              this.service.setTwo_hours(this.two_hours[0]);
            });
        }

        if (!this.service.a6_under[this.activeLocationId] && !this.a6_under) {
          this.service
            .getLocationCustomPricingById(this.activeLocationId, '/pricing/trampoline/general/six_and_under')
            .then((result) => {
              this.a6_under = result;
              this.service.setA6_under(this.a6_under[0]);
            });
        }

        if (!this.service.locationPricings[this.activeLocationId] && !this.locationPricings) {
          this.service
            .getLocationPricing(this.activeLocationId)
            .then(result => {
              this.locationPricings = result;
              this.service.setLocationPricings(this.locationPricings);
            }).catch();
        }

        if (!this.service.locationDeals[this.activeLocationId] && !this.locationDeals) {
          this.service
            .getLocationDeals(this.activeLocationId)
            .then(result => {
              this.locationDeals = result;
              this.service.setLocationDeals(this.locationDeals);
            }).catch();
        }

        if (!this.service.locationHours[this.activeLocationId]) {
          this.service
            .getLocationHours(this.activeLocationId)
            .then((result) => {
              this.locationHours = result;
              this.service.setLocationHours(this.locationHours);
            });
        }

        if (!this.service.contactInfoOfFooter[this.service.activeLocationId] && !this.locationInf) {
          this.service.getLocationDesc(this.activeLocationId)
            .then((data: any) => {
              this.locationDesc = data;
              this.service.setLocationDesc(this.locationDesc);
            });
        }

        if (!this.service.locationTitles[this.activeLocationId] && !this.locationTitles) {
          this.service.getLocationTitles(this.activeLocationId)
            .then((data: any) => {
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
    if (this.service.LIST_OF_LOCATIONS.length > 0) {
      const locArr = this.service.LIST_OF_LOCATIONS;
      for (let i = 0; i < locArr.length; i++) {
        let loc = locArr[i];
        if (!this.service.locationInformation[loc.slug] && !this.service.contactInfoOfFooter[loc.slug]) {
          if (!this.service.contactInfoOfFooter[loc.slug]) {
            this.service.getLocationById(loc.slug)
              .then((data: any[]) => {
                this.service.setContactInfAll(data, loc.slug);
              });
          }
        }
      }
    }
  }
}
