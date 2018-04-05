import {Component, DoCheck, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, DoCheck {

  locationInf: any;
  activeLocationId: any;
  pricing: any;
  validation_msg: any;
  needCallToReverse = false;



  constructor(  private meta: Meta
              , private titleService: Title
              , private route: Router
              , private activatedRoute: ActivatedRoute
              , private service: LocationService) {   }


  ngOnInit() {
    this.titleService.setTitle('Groups');
    this.meta.addTag({ name: 'meta-description', content: 'Groups description' });

    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];
      this.activeLocationId = id;
      this.service
        .getLocationById(id)
        .then(result => this.locationInf = result);

      this.service
        .getLocationCustomPricingById(this.activeLocationId, '/pricing/trampoline/groups')
        .then(result => this.pricing = result);

      this.service.setPricingTrampolineGroups(this.pricing);

    });

  }


  ngDoCheck() {

    if (this.activeLocationId !== this.service.activeLocationId) {
      this.service.activeLocationId = this.activeLocationId;
    }

    if (this.pricing && !this.service.pricingTrampolineGroups[this.activeLocationId]) {
      this.service.setPricingTrampolineGroups(this.pricing);
    }
  }

  reverseCall(){
    this.needCallToReverse = !this.needCallToReverse;
  }

  sendPostComing(id, userPhone) {
    let data = new FormData();
    data.append('location_id', id);
    data.append('phone', userPhone);
    this.service
      .sendPostComing(data)
      .then(result => {
        this.validation_msg = result;
      });
  }

}
