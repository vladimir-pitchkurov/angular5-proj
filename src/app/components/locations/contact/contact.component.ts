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
  locationInf: any;

  socialInf: any[];




  constructor(  private route: Router
              , private activatedRoute: ActivatedRoute
              , private meta: Meta
              , private titleService: Title
              , private service: LocationService) {  }


  ngOnInit() {

    this.activatedRoute.params.forEach((params: Params) => {

      let id = params["id"]; this.activeLocationId = id;

      this.service.activeLocationId = this.activeLocationId;

      this.service
        .getLocationById(id)
        .then(result => this.locationInf = result);

    });

  }

  ngDoCheck() {

    if(this.activeLocationId !== this.service.activeLocationId){
      this.service.activeLocationId = this.activeLocationId;
    }

  }


}
