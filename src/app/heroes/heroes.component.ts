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
  // selectedHero: Hero;

  constructor(
    //创建私有属性,标记为注入点
    private heroService: HeroService
    ) { }

  ngOnInit() {
    // 声明周期钩子中调用,构造出本组件后调用
    this.getHeroes()
  }

  //列表点击后把点击条目传给selectedHero
  // onSelect(hero: Hero) {
  //   this.selectedHero = hero;
  // }

  //获取hero.serviece中的英雄数据传递给本组件heroes
  //subscribe等待远端获取数据
  getHeroes():void {
    this.heroService.getHeroes()
    .subscribe(heroes =>this.heroes=heroes);
  }
  //添加新英雄
  add(name: string):void {
    //name 去除两边空格
    name = name.trim();
    if(!name){return;}
    //传入参数name给服务 强行定位Hero格式
    this.heroService.addHero(<Hero>{name})
    //返回带id的hero
    .subscribe(hero => {
      this.heroes.push(hero)
    })
  }
  //删除选中的英雄
  delete(hero:Hero):void{
    // 在服务器操作成功之前移除要删除的英雄
    this.heroes=this.heroes.filter(h=>h!==hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}