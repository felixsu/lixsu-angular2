import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
import { HealthCheckService } from '../../service/health-check.service';
import { Health } from '../../model/health.model';
import { WebSocketComponent } from './web-socket.component/web-socket.component';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    providers: [MdUniqueSelectionDispatcher, MdIconRegistry, HealthCheckService],
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
        WebSocketComponent
    ],
})
export class DashboardComponent implements OnInit, OnDestroy {

    counter : number = 0;
    currentTime : string = moment().format('MMMM Do YYYY, h:mm:ss a');
    health : Health = new Health();

    constructor( private router : Router, private healthCheckService : HealthCheckService) {
        setInterval(updateTime => { 
            this.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        } ,1000);
    }

    ngOnInit(){
        if (this.isAuth()){
            console.log("logged in");
        } else {
            this.router.navigate(['/login']);
        }
    }

    ngOnDestroy(){
    }

    sendMessage(message) : void {
        this.counter++;
    }

    getHealthStatus(){
        this.healthCheckService.getHealth()
            .subscribe(
                data => this.health = data,
                error => this.health = {statusCode:99, statusMessage:"error"}
            );
    }

    private isAuth() : boolean{
        return true;
    }
}
