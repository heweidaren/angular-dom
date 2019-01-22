import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    // MessageService注入到本组件
    private messageService: MessageService
    ) { }

  //异步订阅 返回模拟的英雄列表
  getHeroes(): Observable<Hero[]> {
    //发送一条消息传递给messageService 从底部添加一条消息
    this.messageService.add('HeroService: fetched heroes')
    return of(HEROES);
  }
}
