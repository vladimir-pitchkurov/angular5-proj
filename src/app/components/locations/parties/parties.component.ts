import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {LocationService} from '../../../services/location.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit, DoCheck, OnDestroy {

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
  allLocationListener: any;

  // retrieve from 
  // /api/website/location/13/birthday/pricing
  jumperPrice = 17.5;
  pizzaPrice = 15;

  totalJumpers = 0;
  totalPizzas = 0;
  humanLabel = '';


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

  listenToAllLocationsLoaded(id)
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.service
        .getLocationById(id)
        .then(result => this.locationInf = result);
    })
  }

  ngDoCheck() {

    if (this.activeLocationId !== this.service.activeLocationId) {
      this.service.activeLocationId = this.activeLocationId;
    }

    if ( this.partiesPricingWeekday && !this.service.pricingBirthday[this.service.activeLocationId] ) {
      this.service.setPricingBirthday( this.partiesPricingWeekday );
    }

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
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId] ? this.service.pricingBirthday[this.service.activeLocationId] : [];
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
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId] ? this.service.pricingBirthday[this.service.activeLocationId] : [];
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
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId] ? this.service.pricingBirthday[this.service.activeLocationId] : [];
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
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId] ? this.service.pricingBirthday[this.service.activeLocationId] : [];
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
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId] ? this.service.pricingBirthday[this.service.activeLocationId] : [];
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
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId] ? this.service.pricingBirthday[this.service.activeLocationId] : [];
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
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId] ? this.service.pricingBirthday[this.service.activeLocationId] : [];
        for (let i = 0; i < searchArr.length; i++) {
          const a = searchArr[i];
          if (a.label == tarif ) {  return /*'http://altitudewoodbridge.pfestore.com/eventss/' +*/ a.value +'/BookEvent.aspx';  }
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
        const searchArr = this.service.pricingBirthday[this.service.activeLocationId] ? this.service.pricingBirthday[this.service.activeLocationId] : [];
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

  
 

  slideJumperNumber () {
    var ele = document.getElementById('jumperInputContainer');
    ele.style.display = 'block';
  }

  submitJumperNumber () {
    var ele = document.getElementById('jumperInputContainer');
    this.totalJumpers = document.getElementById('numberOfJumpersInput').value;
    document.getElementById('numberOfJumpers').innerHTML = this.totalJumpers;
    document.getElementById('numberOfJumpers').style.color = '#92dd02';

    this.humanLabel = "Party for <span style='color:#92dd02'>"+this.totalJumpers+"</span> guests";
    
    this.setPricing();

    document.getElementById('resultBox').style.display = 'block';

    ele.style.display = 'none';
  }

  slidePizzaNumber () {
    var ele = document.getElementById('pizzaInputContainer');
    ele.style.display = 'block';
  }

  submitPizzaNumber () {
    var pizza = 15;
    var ele = document.getElementById('pizzaInputContainer');
    this.totalPizzas = document.getElementById('numberOfPizzasInput').value;
    document.getElementById('numberOfPizzas').innerHTML = this.totalPizzas;
    document.getElementById('numberOfPizzas').style.color = '#92dd02';

    this.humanLabel = this.humanLabel + " & <span style='color:#92dd02'>"+this.totalPizzas+"</span> pizzas";

    this.setPricing();

    document.getElementById('resultBox').style.display = 'block';

    ele.style.display = 'none';
  }

  setPricing () {
    var basePrice = this.totalJumpers * this.jumperPrice + this.totalPizzas * this.pizzaPrice;
    var wkdayPrice = document.getElementById('weekdayPrice');
    var wkendPrice = document.getElementById('weekendPrice');
    document.getElementById('weekendPrice').innerHTML = "$"+(basePrice + 50).toFixed(2);
    wkdayPrice.innerHTML = "<small>Mon - Thurs</small><br><span style='color:#92dd02'>$"+(basePrice).toFixed(2)+"</span>";

    document.getElementById('totalGuests').innerHTML = this.humanLabel;
  }

  ngOnDestroy ()
  {
    if(this.allLocationListener) {
      this.allLocationListener.unsubscribe();
    }
  }
}
