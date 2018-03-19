import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, AfterViewInit {

    constructor(private meta: Meta, private titleService: Title) {
    }

    ngOnInit() {
        this.meta.addTag({ name: 'meta-description', content: 'Test' });
        this.titleService.setTitle('Blog');

    }

  ngAfterViewInit() {

  }

}
