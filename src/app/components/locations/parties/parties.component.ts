import {Component, DoCheck, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {LocationService} from '../../../services/location.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit, DoCheck {

  arrOfPricingNames = [ 'weekday', 'weekend', 'weekday_room', 'weekend_room' ];
  arrWeekdayLabels = [ "ten_weekday", "twenty_weekday", "ten_weekday_food", "twenty_weekday_food" ];
  arrWeekendLabels = [ "ten_weekend", "twenty_weekend", "ten_weekend_food", "twenty_weekend_food"  ];

  locationInf: any;
  activeLocationId: any;
  partiesPricingWeekday: any;
  boolIsChoosed = false;
  boolPrivateRoom = false;
  bool20Jumpers = false;
  boolWithFood = false;
  urlOfBirth: any;


  constructor(  private route: Router
    , private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , private service: LocationService) {  }


    ngOnInit() {
        this.meta.addTag({ name: 'meta-description', content: 'Parties description' });
        this.titleService.setTitle('Parties');

      this.activatedRoute.params.forEach((params: Params) => {

        let id = params["id"];

        this.activeLocationId = id;

        this.service
          .getLocationById(id)
          .then(result => this.locationInf = result);

        this.service
          .getLocationBirthdayParties(this.activeLocationId, "/birthday/variables")
          .then( (result) => {
            this.partiesPricingWeekday = result;
          } );
        this.service.setPricingBirthday( this.partiesPricingWeekday, this.arrOfPricingNames[0] );

        /*this.service
          .getLocationBirthdayParties(this.activeLocationId, "/links/centeredge_events")
          .then( (result) => {
            this.urlOfBirth = result;
          } );
        this.service.setUrlBirthday( this.urlOfBirth );*/


      });
    }


  ngDoCheck() {

    if (this.activeLocationId !== this.service.activeLocationId) {
      this.service.activeLocationId = this.activeLocationId;
    }

    if( this.partiesPricingWeekday && !this.service.pricingBirthday[this.concatIdAndArrName(0)] ) {
      this.service.setPricingBirthday( this.partiesPricingWeekday, this.arrOfPricingNames[0] );

      /*this.service.setUrlBirthday( this.urlOfBirth );*/

    }

    /*console.log('in do check', this.urlOfBirth );

    if( this.urlOfBirth && !this.service.pricingBirthdayUrl[this.service.activeLocationId] ) {

      this.service.setUrlBirthday( this.urlOfBirth );
    }*/



  }


  getWeekday() : any {
    let tarif;

    if( !this.boolPrivateRoom ) {
      if( !this.bool20Jumpers ) {
        if( !this.boolWithFood ) {
          tarif = this.arrWeekdayLabels[0];
        }else { tarif = this.arrWeekdayLabels[2]; }
      }else {
        if( !this.boolWithFood ) {
          tarif = this.arrWeekdayLabels[1];
        }else { tarif = this.arrWeekdayLabels[3]; }
      }
      let searchArr = this.service.pricingBirthday[this.concatIdAndArrName(0)];
      for (let i = 0; i < searchArr.length; i++) {
        let a = searchArr[i];
        if (a.label == tarif ) {  return a.price;  }
      }
    }
  }

  getWeekend() : any {
    let tarif;

    if( !this.boolPrivateRoom ) {
      if( !this.bool20Jumpers ) {
        if( !this.boolWithFood ) {
          tarif = this.arrWeekendLabels[0];
        }else { tarif = this.arrWeekendLabels[2]; }
      }else {
        if( !this.boolWithFood ) {
          tarif = this.arrWeekendLabels[1];
        }else { tarif = this.arrWeekendLabels[3]; }
      }
      let searchArr = this.service.pricingBirthday[this.concatIdAndArrName(0)];
      for (let i = 0; i < searchArr.length; i++) {
        let a = searchArr[i];
        if (a.label == tarif ) {  return a.price;  }
      }
    }
  }

  getHumanLabel() : any {
    let tarif;

    if( !this.boolPrivateRoom ) {
      if( !this.bool20Jumpers ) {
        if( !this.boolWithFood ) {
          tarif = this.arrWeekendLabels[0];
        }else { tarif = this.arrWeekendLabels[2]; }
      }else {
        if( !this.boolWithFood ) {
          tarif = this.arrWeekendLabels[1];
        }else { tarif = this.arrWeekendLabels[3]; }
      }
      let searchArr = this.service.pricingBirthday[this.concatIdAndArrName(0)];
      for (let i = 0; i < searchArr.length; i++) {
        let a = searchArr[i];
        if (a.label == tarif ) {  return a.human_label;  }
      }
    }
  }

  getLinkLabel() : any {
    let tarif;

    if( !this.boolPrivateRoom ) {
      if( !this.bool20Jumpers ) {
        if( !this.boolWithFood ) {
          tarif = this.arrWeekdayLabels[0];
        }else { tarif = this.arrWeekdayLabels[2]; }
      }else {
        if( !this.boolWithFood ) {
          tarif = this.arrWeekdayLabels[1];
        }else { tarif = this.arrWeekdayLabels[3]; }
      }
      let searchArr = this.service.pricingBirthday[this.concatIdAndArrName(0)];
      for (let i = 0; i < searchArr.length; i++) {
        let a = searchArr[i];
        if (a.label == tarif ) {  return a.value + "/BookEvent.aspx";  }
      }
    }
  }






  setBoolPrivateRoom(boo: boolean) {
    this.boolPrivateRoom = boo;
  }

  setBool20Jumpers(boo: boolean) {
    this.bool20Jumpers = boo;
  }

  setBoolWithFood (boo: boolean) {
    this.boolWithFood = boo;
  }

  concatIdAndArrName(indexOfArr: number) {
    return this.activeLocationId + '=>' + this.arrOfPricingNames[indexOfArr];
  }

}
