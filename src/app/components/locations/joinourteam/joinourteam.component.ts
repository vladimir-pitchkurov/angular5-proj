import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params} from "@angular/router";
import {LocationService} from "../../../services/location.service";

@Component({
  selector: 'app-joinourteam',
  templateUrl: './joinourteam.component.html',
  styleUrls: ['./joinourteam.component.css']
})
export class JoinourteamComponent implements OnInit {

  allLocationListener: any;
  activeLocationId: any;
  link: any;

  constructor(private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , private service: LocationService) {
    this.listenToAllLocationsLoaded();
  }

  ngOnInit() {
    this.meta.addTag({name: 'meta-description', content: 'description'});
    this.titleService.setTitle('Join our team title');
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];
      this.activeLocationId = id;
      this.service.activeLocationId = this.activeLocationId;
    });
  }

  listenToAllLocationsLoaded()
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.service.getLocationLinksByField(this.activeLocationId, 'jobs')
        .then(data => {
          this.link = data;
        })
    });
  }
}
