import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor } from '@angular/common';
import {Observable} from 'rxjs/Rx';
import {MdUniqueSelectionDispatcher} from '@angular2-material/core';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox';
import {MD_RADIO_DIRECTIVES} from '@angular2-material/radio';
import {MD_PROGRESS_CIRCLE_DIRECTIVES} from '@angular2-material/progress-circle';
import {MD_PROGRESS_BAR_DIRECTIVES} from '@angular2-material/progress-bar';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_ICON_DIRECTIVES, MdIconRegistry} from '@angular2-material/icon';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';
import * as moment from 'moment';
import { ChatService } from './service/chat.service';
import { HealthCheckService } from './service/health-check.service';
import { Health } from './model/health.model';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [MdUniqueSelectionDispatcher, MdIconRegistry, ChatService, HealthCheckService],
  directives: [
    NgFor,
    MD_SIDENAV_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_CHECKBOX_DIRECTIVES,
    MD_RADIO_DIRECTIVES,
    MD_PROGRESS_CIRCLE_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_PROGRESS_BAR_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    MD_TABS_DIRECTIVES,
  ],
})
export class AppComponent implements OnInit, OnDestroy {

  counter : number = 0;
  currentTime : string = moment().format('MMMM Do YYYY, h:mm:ss a');
  toSendMessage : string = "lixsu";
  receivedMessage : string = "init";
  health : Health = new Health();

  messages = [];
  connection;
  message;

  constructor( private chatService : ChatService, private healthCheckService : HealthCheckService) {
    setInterval(updateTime => { 
      this.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    } ,1000);
  }

  ngOnInit(){
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }

  ngOnDestroy(){
    this.connection.unsubscribe();
  }

  sendMessage(message) : void {
    this.chatService.sendMessage(this.message);
    this.message = '';
    this.counter++;
  }

  getHealthStatus(){
    this.healthCheckService.getHealth()
          .subscribe(
            data => this.health = data,
            error => this.health = error
          );
  }
}
