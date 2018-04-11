import {Component, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  activeLocationId: any;
  locationInf: any[];
  pricing: any;
  validation_msg: any;
  needCallToReverse = false;
  allLocationListener: any;

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
      this.service.activeLocationId = this.activeLocationId;
      this.listenToAllLocationsLoaded(); //my

    });

    /*if (this.activeLocationId && !this.service.contactInfoOfFooter[this.activeLocationId]) {
      this.service.getLocationById(this.activeLocationId)
        .then((data: any[]) => {
          console.log(data);
          this.locationInf = data;
        });
    }*/
  }

  //my
  listenToAllLocationsLoaded()
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.getLocationInf(this.activeLocationId);
    })
  }

  getLocationInf(id: any){

    if(!id){
      return;
    }

      this.service.getLocationById(this.activeLocationId)
        .then((data: any[]) => {
          this.locationInf = data;
        });


  }

  /*reverseCall(){
    this.needCallToReverse = !this.needCallToReverse;
  }*/

  /*sendPostComing(id, userPhone) {
    let data = new FormData();
    data.append('location_id', id);
    data.append('phone', userPhone);
    this.service
      .sendPostComing(data)
      .then(result => {
        this.validation_msg = result;
      });
  }*/
}
