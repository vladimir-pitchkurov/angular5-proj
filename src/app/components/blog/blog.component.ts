import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, AfterViewInit {

  activeLocationId: any;
  locationInf: any;

    constructor(private meta: Meta,
                private titleService: Title,
                private route: Router,
                private activatedRoute: ActivatedRoute,
                private service: LocationService) {
    }

    ngOnInit() {
        this.meta.addTag({ name: 'meta-description', content: 'Test' });
        this.titleService.setTitle('Blog');

      this.activatedRoute.params.forEach((params: Params) => {
        let id = +params["id"];
        this.activeLocationId = id;

        /*this.service
          .getLocationById(id)
          .then(result => this.locationInf = result);*/

      });

    }

  ngAfterViewInit() {

  }

}
