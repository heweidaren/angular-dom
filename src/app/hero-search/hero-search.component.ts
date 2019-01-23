import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms= new Subject<string>()

  constructor(private HeroService: HeroService) { }

  // 将搜索词推送到可观察流中
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      //300毫秒后运行
      debounceTime(300),
      //如果和上一次请求相同的话忽略新请求
      distinctUntilChanged(),
      //改变之后切换到新的值
      switchMap((term: string) => this.HeroService.searchHeroes(term))
    )
  }


}
