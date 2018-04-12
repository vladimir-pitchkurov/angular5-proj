import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationService} from '../../services/location.service';
import { PaginanationService } from '../../paginanation.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, AfterViewInit {


  pager: any = {};
  pagedItems: any[];

  activeLocationId: any;
  allLocationListener: any;
  blogs: any = [];

    constructor(private meta: Meta,
                private titleService: Title,
                private route: Router,
                private activatedRoute: ActivatedRoute,
                private service: LocationService,
                private pageService: PaginanationService) {
      this.listenToAllLocationsLoaded();
    }

    ngOnInit() {
        this.meta.addTag({ name: 'meta-description', content: 'Test' });
        this.titleService.setTitle('Blog');

      this.activatedRoute.params.forEach((params: Params) => {
        let id = params["id"];
        this.activeLocationId = id;
        this.service.activeLocationId = this.activeLocationId;
      });

    }

  listenToAllLocationsLoaded()
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.loadBlogs(this.activeLocationId);
    })
  }


  loadBlogs(id: any)
  {
    if(!id) {
      return;
    }

    this.service.getLocationBlogs(this.activeLocationId)
      .then(data =>{
        this.blogs = data;
        this.setPage(1);
      })
  }

  setPage (page: number) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }

      this.pager = this.pageService.getPager(this.blogs.length, page);
      this.pagedItems = this.blogs.sort(this.compareDate).slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  compareDate(post1, post2) {
    const date1: any = new Date(post1.post_date);
    const date2: any = new Date(post2.post_date);

    return (date2 - date1);
  }

  ngOnDestroy()
  {
    this.allLocationListener.unsubscribe();
  }

  ngAfterViewInit() {

  }

}
