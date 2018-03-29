import {Component, DoCheck, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class PassComponent implements OnInit, DoCheck {

  activeLocationId: any;
  locationInf: any;

  constructor(private route: Router
    , private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , private service: LocationService ) {  }

    ngOnInit() {
        this.titleService.setTitle('Buy a Pass');
        this.meta.addTag({ name: 'meta-description', content: 'Pass description' });

      this.activatedRoute.params.forEach((params: Params) => {

        let id = params["id"]; this.activeLocationId = id;

        this.service.activeLocationId = this.activeLocationId;

        this.service
          .getLocationHours(id)
          .then(result => this.locationHours = result);

        this.service
          .getLocationById(id)
          .then(result => this.locationInf = result);

      });
    }

    ngDoCheck(){
      if(this.activeLocationId !== this.service.activeLocationId){
        this.service.activeLocationId = this.activeLocationId;
      }
    }

}
