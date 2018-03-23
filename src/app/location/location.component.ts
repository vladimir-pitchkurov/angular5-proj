import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {LocationService} from '../services/location.service';
import {AppComponent} from '../app.component';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})


export class LocationComponent implements OnInit {

  activeLocationId: any;
  constructor( private route: ActivatedRoute,
               private router: Router,
               private service: LocationService,
               public app: AppComponent) { }

  ngOnInit() {

    /*this.activeLocationId = this.route.snapshot.paramMap.get("id");

    console.log(this.activeLocationId);
    this.service.getLocationHours(this.activeLocationId)
      .then((data: any[]) => {
        this.locationHours = data;
      });*/

  }

  public getParamId(): any{
    this.activeLocationId = this.route.snapshot.paramMap.get("id");
    return this.activeLocationId;
  }

}
