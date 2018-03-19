import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

    constructor(private meta: Meta, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Rules');
        this.meta.addTag({ name: 'meta-description', content: 'Rules description' });
    }

}
