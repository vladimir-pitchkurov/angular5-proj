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
  arrWeekdayLabels = [ 'ten_weekday', 'twenty_weekday', 'ten_weekday_food', 'twenty_weekday_food', 'ten_weekday_private', 'twenty_weekday_private', 'ten_weekday_food_private', 'twenty_weekday_food_private' ];
  arrWeekendLabels = [ 'ten_weekend', 'twenty_weekend', 'ten_weekend_food', 'twenty_weekend_food', 'ten_weekend_private', 'twenty_weekend_private', 'ten_weekend_food_private', 'twenty_weekend_food_private' ];

  locationInf: any;
  activeLocationId: any;
  partiesPricingWeekday: any[];
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
      this.service.activeLocationId = this.activeLocationId;

      this.service
        .getLocationById(id)
        .then(result => this.locationInf = result);

      this.service
        .getLocationBirthdayParties('/birthday/variables')
        .then( (result: any[]) => {
          this.partiesPricingWeekday = result;
        } );
      this.service.setPricingBirthday( this.partiesPricingWeekday );

      this.service
        .getLocationBirthdayParties( "/links/centeredge_events")
        .then( (result) => {
          this.urlOfBirth = result;
        } );
      this.service.setUrlBirthday( this.urlOfBirth );


    });
  }


  ngDoCheck() {

    /*console.log('this.partiesPricingWeekday ', this.partiesPricingWeekday);

    console.log('this.urlOfBirth ', this.urlOfBirth);

    console.log('this.service.pricingBirthday[this.concatIdAndArrName(0)]  ', this.service.pricingBirthday[this.concatIdAndArrName(0)] );

*/
    if (this.activeLocationId !== this.service.activeLocationId) {
      this.service.activeLocationId = this.activeLocationId;
    }

    if ( this.partiesPricingWeekday && !this.service.pricingBirthday[this.concatIdAndArrName(0)] ) {
      this.service.setPricingBirthday( this.partiesPricingWeekday );

      /*this.service.setUrlBirthday( this.urlOfBirth );*/

    }

    let a = this.getWeekend();
    console.log('a ', a);

    /*console.log('in do check', this.urlOfBirth );

    console.log('in do check serv value: ', this.service.pricingBirthdayUrl[this.service.activeLocationId].url );*/

    if ( this.urlOfBirth && !this.service.pricingBirthdayUrl[this.service.activeLocationId] ) {

      this.service.setUrlBirthday( this.urlOfBirth );
    }

  }


  getWeekday(): any {
    let tarif;

      if ( !this.boolPrivateRoom ) {
        if ( !this.bool20Jumpers ) {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekdayLabels[0];
          } else { tarif = this.arrWeekdayLabels[2]; }
        } else {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekdayLabels[1];
          } else { tarif = this.arrWeekdayLabels[3]; }
        }
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId];
        for (let i = 0; i < searchArr.length; i++) {
          const a = searchArr[i];
          if (a.label == tarif ) {  return a.price;  }
        }
      } else {
        if ( !this.bool20Jumpers ) {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekdayLabels[4];
          } else { tarif = this.arrWeekdayLabels[6]; }
        } else {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekdayLabels[5];
          } else { tarif = this.arrWeekdayLabels[7]; }
        }
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId];
        for (let i = 0; i < searchArr.length; i++) {
          const a = searchArr[i];
          if (a.label == tarif ) {  return a.price;  }
        }
      }

  }

  getWeekend(): any {
    let tarif;

      if ( !this.boolPrivateRoom ) {
        if ( !this.bool20Jumpers ) {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekendLabels[0];
          } else { tarif = this.arrWeekendLabels[2]; }
        } else {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekendLabels[1];
          } else { tarif = this.arrWeekendLabels[3]; }
        }
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId];
        for (let i = 0; i < searchArr.length; i++) {
          const a = searchArr[i];
          if (a.label == tarif ) {  return a.price;  }
        }
      } else {
        if ( !this.bool20Jumpers ) {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekendLabels[4];
          } else { tarif = this.arrWeekendLabels[6]; }
        } else {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekendLabels[5];
          } else { tarif = this.arrWeekendLabels[7]; }
        }
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId];
        for (let i = 0; i < searchArr.length; i++) {
          const a = searchArr[i];
          if (a.label == tarif ) {  return a.price;  }
        }
      }


  }

  getHumanLabel(): any {
    let tarif;

      if ( !this.boolPrivateRoom ) {
        if ( !this.bool20Jumpers ) {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekendLabels[0];
          } else { tarif = this.arrWeekendLabels[2]; }
        } else {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekendLabels[1];
          } else { tarif = this.arrWeekendLabels[3]; }
        }
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId];
        for (let i = 0; i < searchArr.length; i++) {
          const a = searchArr[i];
          if (a.label == tarif ) {  return a.human_label;  }
        }
      } else {
        if ( !this.bool20Jumpers ) {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekendLabels[4];
          } else { tarif = this.arrWeekendLabels[6]; }
        } else {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekendLabels[5];
          } else { tarif = this.arrWeekendLabels[7]; }
        }
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId];
        for (let i = 0; i < searchArr.length; i++) {
          const a = searchArr[i];
          if (a.label == tarif ) {  return a.human_label;  }
        }
      }

  }

  getLinkLabel(): any {
    let tarif;

      if ( !this.boolPrivateRoom ) {
        if ( !this.bool20Jumpers ) {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekdayLabels[0];
          } else { tarif = this.arrWeekdayLabels[2]; }
        } else {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekdayLabels[1];
          } else { tarif = this.arrWeekdayLabels[3]; }
        }
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId];
        for (let i = 0; i < searchArr.length; i++) {
          const a = searchArr[i];
          if (a.label == tarif ) {  return /*'http://altitudewoodbridge.pfestore.com/events/' +*/ a.value +'/BookEvent.aspx';  }
        }
      } else {
        if ( !this.bool20Jumpers ) {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekdayLabels[4];
          } else { tarif = this.arrWeekdayLabels[6]; }
        } else {
          if ( !this.boolWithFood ) {
            tarif = this.arrWeekdayLabels[5];
          } else { tarif = this.arrWeekdayLabels[7]; }
        }
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId];
        for (let i = 0; i < searchArr.length; i++) {
          const a = searchArr[i];
          if (a.label == tarif ) {  return a.value +'/BookEvent.aspx';  }
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
