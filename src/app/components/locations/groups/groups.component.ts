import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

    constructor(private meta: Meta, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Groups');
        this.meta.addTag({ name: 'meta-description', content: 'Groups description' });
    }

}
