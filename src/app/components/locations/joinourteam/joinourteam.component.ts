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

  constructor(private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , private service: LocationService) { }

  ngOnInit() {
    this.meta.addTag({name: 'meta-description', content: 'description'});
    this.titleService.setTitle('Join our team title');
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];
      this.service.activeLocationId = id;
    });
  }
}
