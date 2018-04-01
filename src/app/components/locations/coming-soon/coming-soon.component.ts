import {Component, DoCheck, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LocationService} from "../../../services/location.service";

@Component({
    selector: 'app-coming-soon',
    templateUrl: './coming-soon.component.html',
    styleUrls: ['./coming-soon.component.css']
})
export class ComingSoonComponent implements OnInit, DoCheck {

    isLeftVisible = 0;
    boolChanged = false;
    activeLocationId: any;
    locationInf: any;
    validation_msg: any;

    constructor(private route: Router
      , private activatedRoute: ActivatedRoute
      , private meta: Meta
      , private titleService: Title
      , private service: LocationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('coming soon');
        this.meta.addTag({ name: 'meta-keywords', content: 'coming keywords' });
        this.meta.addTag({ name: 'meta-description', content: 'coming description' });

      this.activatedRoute.params.forEach((params: Params) => {
        let id = params["id"]; this.activeLocationId = id;
        this.service.activeLocationId = this.activeLocationId;
      });
      setInterval(() => {
        if (!this.boolChanged) {
          this.isLeftVisible++;
          if (this.isLeftVisible == 3) {
            this.isLeftVisible = 0;
          }
        }
      }, 3000);
    }

  ngDoCheck() {
    if (this.activeLocationId !== this.service.activeLocationId){
      this.service.activeLocationId = this.activeLocationId;
    }
  }

  sendPostComing(id, userPhone) {
    let data = new FormData();
    data.append('location_id', id);
    data.append('user_phone', userPhone);
    this.service
      .sendPostComing(data)
      .then(result => {
        this.validation_msg = result;
      });
  }
}
