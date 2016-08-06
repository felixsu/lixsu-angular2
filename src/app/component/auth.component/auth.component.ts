import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {Observable} from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css'],
    directives:[
        MD_BUTTON_DIRECTIVES,
    ]
})
export class AuthComponent implements OnInit {


    constructor(private router : Router){}

    login() : any {
        console.log("login pressed");
    }

    ngOnInit(){
        if (this.isAuth()){
            this.router.navigate(['/dashboard']);
        }
    }

    private isAuth() : boolean {
        return true;
    }

}