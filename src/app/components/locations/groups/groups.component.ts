import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnChanges, DoCheck {
  locationInf: any;
  activeLocationId: any;
  pricing: any;

  constructor(private meta: Meta,
              private titleService: Title,
              private route: Router
    , private activatedRoute: ActivatedRoute
    , private service: LocationService) {
  }

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

      //console.log('on Init Groups', this.pricing);

    });

  }

  ngOnChanges() {

  }

  ngDoCheck() {
    if (this.activeLocationId !== this.service.activeLocationId) {
      this.service.activeLocationId = this.activeLocationId;
    }

    if (this.pricing && !this.service.pricingTrampolineGroups) {
      this.service.setPricingTrampolineGroups(this.pricing);
    }
    /*else if (!this.service.pricingTrampolineGroups[this.activeLocationId] && this.activeLocationId) {
      this.service.setPricingTrampolineGroups(this.pricing);
    }*/


    //console.log('on DoCheck Groups', this.service.pricingTrampolineGroups);
  }

}
