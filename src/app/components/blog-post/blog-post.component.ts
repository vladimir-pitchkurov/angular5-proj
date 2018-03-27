import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

    constructor(private meta: Meta,
                private titleService: Title,
                private route: Router,
                ) {
    }

    ngOnInit() {
        this.titleService.setTitle('Blog-post');
        this.meta.addTag({ name: 'meta-description', content: 'Blog-post' });
    }

}
