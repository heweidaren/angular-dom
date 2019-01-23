import { Component, OnInit,Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  //暴露hero 使父组件能绑定到
  // @Input() hero: Hero;
  hero: Hero;

  constructor(
    //ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息。 这个组件对从 URL 中提取的路由参数感兴趣。 其中的 id 参数就是要显示的英雄的 id
    private route: ActivatedRoute,
    //从远端获取的数据
    private heroService: HeroService,
    //angular服务,用来返回上一个视图
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void{
    // route.snapshot是路由静态快照 抓取自刚创建组件 paramMap从url中提取的股友参数的字典值 
    const id= +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero =hero);
  }
  //后退一步
  goBack(): void {
    this.location.back();
  }

  //保存英雄
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(()=>this.goBack());
  }
}
