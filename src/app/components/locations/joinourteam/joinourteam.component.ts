import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-joinourteam',
  templateUrl: './joinourteam.component.html',
  styleUrls: ['./joinourteam.component.css']
})
export class JoinourteamComponent implements OnInit {

    constructor(private meta: Meta, private titleService: Title) {
    }

    ngOnInit() {
        this.meta.addTag({ name: 'meta-description', content: 'description' });
        this.titleService.setTitle('Join our team title');

    }

}
