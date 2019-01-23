import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';
//path用于匹配浏览器url字符串 component 当导航到此路由时,路由器应该创建哪个组件
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  //空白根目录的时候进入dashboard模块
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // 冒号表示占位符,表示某个特定英雄的id
  { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [
    //初始化路由器 forRoot配置
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
