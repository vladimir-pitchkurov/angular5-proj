import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {LocationService} from '../../../services/location.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, DoCheck {


  activeLocationId: any;
  locationInf: any[];

  socialInf: any[];




  constructor(private service: LocationService
    , private route: Router
    , private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {

    /*this.activatedRoute.params.forEach((params: Params) => {

      /!*let id = params["id"]; this.activeLocationId = id;*!/


      /!*if (!this.activeLocationId || isNullOrUndefined(this.activeLocationId) ) {*!/
        if (this.activeLocationId !== this.service.activeLocationId ) {
          this.locationInf = [];
          this.socialInf = [];
          this.activeLocationId = params['id'];;
        }
      this.activeLocationId = params['id'];;
      /!*}*!/
      console.log('debug1', this.activeLocationId);

      console.log('debug2', this.service.contactInfoOfFooter[this.activeLocationId]);

      const id = params['id']; /!*this.activeLocationId = this.service.activeLocationId;*!/

      if ((!this.service.contactInfoOfFooter[this.activeLocationId])) {

        this.service.getLocationById(this.activeLocationId)
          .then((data: any[]) => {
            this.locationInf = data;
          });

        console.log('debug3', this.activeLocationId);

        this.service.getLocationSocial(this.activeLocationId)
          .then((data: any[]) => {
            this.socialInf = data;
          });


        if (!this.service.infInFooter[this.activeLocationId]) {this.service.setContactInf(this.locationInf); }


      }

      /!*if(!this.activeLocationId){

        console.log(this.activeLocationId);

        this.activeLocationId = id;

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

        if (!this.service.infInFooter) {this.service.setContactInf(this.locationInf); }


      }*!/

    });*/
  }

  ngOnChanges(): void {

    /*this.activatedRoute.params.forEach((params: Params) => {
      if (!this.activeLocationId || isNullOrUndefined(this.activeLocationId) ) {
        if (this.activeLocationId !== this.service.activeLocationId) {
          this.locationInf = [];
          this.socialInf = [];
          this.activeLocationId = this.service.activeLocationId;
        }
      }

      const id = params['id'];

      console.log('id = ', id);

      this.activeLocationId = this.service.activeLocationId;

      if (this.activeLocationId ) {
        this.service.getLocationById(this.activeLocationId)
          .then((data: any[]) => {
            this.locationInf = data;
          });

        this.service.getLocationSocial(this.activeLocationId)
          .then((data: any[]) => {
            this.socialInf = data;
          });

        /!*##  ##*!/



        if (!this.service.infInFooter) {this.service.setContactInf(this.locationInf); }

      }
    });*/
  }

  ngDoCheck() {

    /*if(this.activeLocationId !== this.service.activeLocationId){
      this.service.activeLocationId = this.activeLocationId;
    }

    if (!this.activeLocationId || isNullOrUndefined(this.activeLocationId) ) {
      if (this.activeLocationId !== this.service.activeLocationId) {
        this.locationInf = [];
        this.socialInf = [];
        this.activeLocationId = this.service.activeLocationId;
      }
    }*/

    /*if (!this.service.infInFooter && this.activeLocationId ) {this.service.setContactInf(this.locationInf); }*/



  }










  /*activeLocationId: any;
  locationInf: any;
  locationInfObj = {};


  constructor(  private meta: Meta
                , private titleService: Title
                , private service: LocationService
                , private route: Router
                , private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.titleService.setTitle('Escape-room');
        this.meta.addTag({ name: 'meta-description', content: 'Test' });

      this.activatedRoute.params.forEach((params: Params) => {
        /!*this.activeLocationId = this.service.getActiveLocationId();*!/
        let id = params["id"]; this.activeLocationId = id;

        this.service.activeLocationId = this.activeLocationId;

        this.service
          .getLocationById(id)
          .then(result => this.locationInf = result);
        this.service.setContactInf(this.locationInf);

        this.locationInfObj = this.service.contactInfoOfFooter;

        console.log(this.locationInfObj);

      });

    }

    ngDoCheck (){
      //this.locationInfObj = this.service.contactInfoOfFooter;


      //if (!this.service.infInFooter && this.activeLocationId ) {this.service.setContactInf(this.locationInf); }
      console.log('on DoCheck', this.locationInfObj[this.activeLocationId]);

    }
*/
}
