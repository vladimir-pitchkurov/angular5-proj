import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  activeLocationId: any;
  post: any;
  allLocationListener: any;
  postId: any;
  allPosts: any = [];
  latestPosts: any = [];
  private limitLatestPosts: number = 3;

    constructor(private meta: Meta,
                private titleService: Title,
                private route: Router,
                private activatedRoute: ActivatedRoute,
                private service: LocationService
                ) {
      this.listenToAllLocationsLoaded();
    }

    ngOnInit() {
        this.titleService.setTitle('Blog-post');
        this.meta.addTag({ name: 'meta-description', content: 'Blog-post' });

      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.activeLocationId = id;
      this.service.activeLocationId = this.activeLocationId;
    }

    getPost(postId) : void {
      this.allPosts.find(post => {
        if(post.id == this.postId) {
          this.post = post;
        }
      })

    }

    getAllPosts(id) : void {

      if(!id) {
        return;
      }

      this.service.getLocationBlogs(id).then(data => {
        const postId = this.activatedRoute.snapshot.paramMap.get('post');
        this.postId = postId;
        this.allPosts = data;
        this.getPost(this.postId);
        this.latestPosts = this.sortPosts().slice(0, this.limitLatestPosts);
      })
    }

    sortPosts(): any {
      return this.allPosts.sort(this.compareDate);
    }

    compareDate(post1, post2) {
      const date1: any = new Date(post1.post_date);
      const date2: any = new Date(post2.post_date);

      return (date2 - date1);
    }

  listenToAllLocationsLoaded()
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.getAllPosts(this.activeLocationId);
    })
  }

}
