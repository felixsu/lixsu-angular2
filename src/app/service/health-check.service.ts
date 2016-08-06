import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Health } from '../model/health.model';

@Injectable()
export class HealthCheckService {

    private healthUrl : string = "http://localhost:8080/health_check/details";

    constructor (private http: Http) {}

    getHealth() : Observable <Health> {
        return this.http
            .get(this.healthUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let data = res.json();
        return  data || {};
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw({statusCode : 99, statusMessage: "error"});
    }
}