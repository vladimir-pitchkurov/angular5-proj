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
  allPosts: any;
  latestPosts: any;
  mockPost: any = [
    {"id":3,
      "location_id":13,
      "brand_id":null,
      "category":"32423",
      "post_title":"Post title 1",
      "post_date":"2018-02-10",
      "excerpt":"Excerpt 1",
      "fulltext":"something",
      "hash_name":"WkCXoVpSJG7lGlM0U3PLXOhQbzuN4qP07KTMZMcK.png",
      "size":"905398",
      "real_name":"Image-uploaded-from-iOS.png",
      "extension":"jpg",
      "mime":"image\/jpeg",
      "created_at":"2018-04-10 16:26:59",
      "updated_at":"2018-04-10 16:27:01",
      "img_url":"https:\/\/semrun.s3.us-east-2.amazonaws.com\/website_blog\/WkCXoVpSJG7lGlM0U3PLXOhQbzuN4qP07KTMZMcK.png.jpg"
    }];

  mockBlogs: any = [
    {"id":3,
      "location_id":13,
      "brand_id":null,
      "category":"32423",
      "post_title":"Post title 1",
      "post_date":"2018-02-10",
      "excerpt":"Excerpt 1",
      "fulltext":"something",
      "hash_name":"WkCXoVpSJG7lGlM0U3PLXOhQbzuN4qP07KTMZMcK.png",
      "size":"905398",
      "real_name":"Image-uploaded-from-iOS.png",
      "extension":"jpg",
      "mime":"image\/jpeg",
      "created_at":"2018-04-10 16:26:59",
      "updated_at":"2018-04-10 16:27:01",
      "img_url":"https:\/\/semrun.s3.us-east-2.amazonaws.com\/website_blog\/WkCXoVpSJG7lGlM0U3PLXOhQbzuN4qP07KTMZMcK.png.jpg"
    },
    {"id":4,
      "location_id":null,
      "brand_id":2,
      "category":"32423",
      "post_title":"Post title 2",
      "post_date":"2018-01-10",
      "excerpt":"Excerpt 2",
      "fulltext":"something again",
      "hash_name":"PrWzfEX5NeiYgZXxoOQYmYkgewND09dY0280ZTKc.png",
      "size":"905398",
      "real_name":"Image-uploaded-from-iOS.png",
      "extension":"jpg",
      "mime":"image\/jpeg",
      "created_at":"2018-04-10 16:27:18",
      "updated_at":"2018-04-10 16:27:20",
      "img_url":"https:\/\/semrun.s3.us-east-2.amazonaws.com\/website_blog\/PrWzfEX5NeiYgZXxoOQYmYkgewND09dY0280ZTKc.png.jpg"
    },
    {"id":5,
      "location_id":null,
      "brand_id":2,
      "category":"Category",
      "post_title":"Title of the blog post",
      "post_date":"2018-04-10",
      "excerpt":"Blog post excerpt",
      "fulltext":"some",
      "hash_name":"1Cd7eNR2IXwiG9wvv7P9wDViFuIE641z0q3pnzU5.png",
      "size":"905398",
      "real_name":"Image-uploaded-from-iOS.png",
      "extension":"jpg",
      "mime":"image\/jpeg",
      "created_at":"2018-04-10 17:06:17",
      "updated_at":"2018-04-10 17:06:19",
      "img_url":"https:\/\/semrun.s3.us-east-2.amazonaws.com\/website_blog\/1Cd7eNR2IXwiG9wvv7P9wDViFuIE641z0q3pnzU5.png.jpg"
    }
  ];

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

      const postId = this.activatedRoute.snapshot.paramMap.get('post');
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.activeLocationId = id;
      this.service.activeLocationId = this.activeLocationId;
      this.postId = postId;
    }

    getPost(id, postId) : void {
      console.log("inside getPost: "+id + " "+postId);
      this.service.getLocationPost(id, postId)
        .then(data =>{
          this.post = data;
        })
    }

    getAllPosts(id) : void {
      this.service.getLocationBlogs(id).then(data => {
        this.allPosts = data;
      })
    }

    sortPosts(): any {
      return this.mockBlogs.sort(this.compareDate);
    }

    compareDate(post1, post2) {
      const date1: any = new Date(post1.post_date);
      const date2: any = new Date(post2.post_date)

      return (date2 - date1);
    }

  listenToAllLocationsLoaded()
  {
    this.allLocationListener = this.service.allLocationListEmitter.subscribe(data => {
      this.getPost(this.activeLocationId, this.postId);
      this.getAllPosts(this.activeLocationId);
      this.latestPosts = this.sortPosts();
    })
  }

}
