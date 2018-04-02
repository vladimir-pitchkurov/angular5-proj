import {Component, DoCheck, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';

@Component({
  selector: 'app-waiver',
  templateUrl: './waiver.component.html',
  styleUrls: ['./waiver.component.css']
})
export class WaiverComponent implements OnInit, DoCheck {

  activeLocationId: any;

    constructor( private route: Router
      , private activatedRoute: ActivatedRoute
      , private meta: Meta
      , private titleService: Title
      , private service: LocationService ) { }

    ngOnInit() {
        this.titleService.setTitle('Waiver');
        this.meta.addTag({ name: 'meta-description', content: 'Waiver description' });

      this.activatedRoute.params.forEach((params: Params) => {

        let id = params["id"];

        this.activeLocationId = id;

        this.service.activeLocationId = this.activeLocationId;

      });
    }

    ngDoCheck() {
      if ( this.activeLocationId !== this.service.activeLocationId ) {
        this.service.activeLocationId = this.activeLocationId;
      }

      //console.log("this.service.allLinksCenteredge_waiver[this.activeLocationId].url: ", this.service.allLinksCenteredge_waiver[this.activeLocationId].url);
      /*console.log("this.activeLocationId: ", this.activeLocationId);
      console.log("this.service.allLinksCenteredge_waiver: ", this.service.allLinksCenteredge_waiver);*/


    }

    goToWaiver(){
      window.open(this.service.allLinksCenteredge_waiver[this.activeLocationId]? this.service.allLinksCenteredge_waiver[this.activeLocationId].url : '/', "_blank");
    }

}
