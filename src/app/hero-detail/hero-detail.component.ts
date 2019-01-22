import { Component, OnInit,Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //暴露hero 使父组件能绑定到
  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
