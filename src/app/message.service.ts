import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[]=[];
  //添加
  add(message:string){
    this.messages.push(message);
  }
  //清空数组
  clear(){
    this.messages= [];
  }
  constructor() { }
}

