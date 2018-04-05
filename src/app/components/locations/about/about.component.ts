import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LocationService} from "../../../services/location.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private route: Router
    , private activatedRoute: ActivatedRoute
    , private meta: Meta
    , private titleService: Title
    , private service: LocationService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('About');
    this.meta.addTag({ name: 'meta-description', content: 'About description' });
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];
      this.service.activeLocationId = id;;
    });
  }

}
