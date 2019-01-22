import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
const httpOptions = {
  //请求头
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class HeroService {
  // 想要获取的地址
  private heroesUrl = 'apii/heroes'; 

  constructor(
    private http: HttpClient,
    // MessageService注入到本组件
    private messageService: MessageService
  ) { }

  //异步订阅 返回模拟的英雄列表
  getHeroes(): Observable<Hero[]> {
    //发送一条消息传递给messageService 从底部添加一条消息
    this.messageService.add('HeroService: fetched heroes')
    //get获取远方数据
    return this.http.get<Hero[]>(this.heroesUrl)
    // pipe扩展结果
    .pipe(
      //tap可以查看Observable中的值, 不会改变值本身
      tap(_ =>this.log('fetched heroes')),
      //catchError会拦截失败的observable 它把错误对象传给错误处理器,错误处理器会处理这个错误
      catchError(this.handleError('getHeroes',[]))
    )
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    //返回单个可观察对象 不是数组
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  //保存修改后的英雄
  updateHero(hero: Hero): Observable<any>{
    //http.put接受三个参数 url地址 要修改的数据 选项
    return this.http.put(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  };
  //抽出来方便调用
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // 处理失败的Http操作。
  // 让应用继续。
  // @param operation - 失败的操作名称
  // @param result - 作为可观察结果返回的可选值
  // <T>泛型 
  private handleError<T> (operation="operation",result?:T){
    return (error:any): Observable<T> =>{

      // TODO: 将错误发送到远程日志记录基础结构
      console.error(error); // 记录到控制台

      // TODO: 把错误发到页面底部
      this.log(`${operation} failed: ${error.message}`);

      // 返回空结果让服务器继续运行
      return of(result as T);
    }
  }
}
