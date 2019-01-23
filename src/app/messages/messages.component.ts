import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  constructor(
    // 变成共有属性,ng组件只能绑定共有属性
    public messageService: MessageService
    ) { }

  ngOnInit() {
  }

}
