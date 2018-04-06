import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, OnDestroy {

  activeLocationId: any;
  locationInf: any;
  activityImages: any = [];
  allLocationListener: any;

  constructor(private route: Router
    , private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , private service: LocationService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Activities');
    this.meta.addTag({ name: 'meta-description', content: 'Activities description' });

    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];
      this.activeLocationId = id;
      this.service.activeLocationId = this.activeLocationId;

      this.listenToAllLocationsLoaded();
    });
  }

  ngOnDestroy()
  {
    this.allLocationListener.unsubscribe();
  }


  listenToAllLocationsLoaded()
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.loadActivityItems(this.activeLocationId);
    })
  }


  loadActivityItems(id: any)
  {
    if(!id) {
      return;
    }

    this.service.loadActivityItems(this.activeLocationId)
      .then(data =>{
        this.activityImages = data;
        console.log('activityImages', this.activityImages);
      })
  }

}
