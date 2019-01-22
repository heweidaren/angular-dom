import { HeroService } from './../hero.service';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // 绑定英雄数组
  heroes: Hero[];
  //列表点击传值
  selectedHero: Hero;

  constructor(
    //创建私有属性,标记为注入点
    private heroService: HeroService
    ) { }

  ngOnInit() {
    // 声明周期钩子中调用,构造出本组件后调用
    this.getHeroes()
  }

  //列表点击后把点击条目传给selectedHero
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  //获取hero.serviece中的英雄数据传递给本组件heroes
  //subscribe等待远端获取数据
  getHeroes():void {
    this.heroService.getHeroes()
    .subscribe(heroes =>this.heroes=heroes);
  }

}