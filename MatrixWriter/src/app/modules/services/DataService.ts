import {Injectable}             from '@angular/core';
import {Http, Headers}          from '@angular/http';
import 'rxjs/Rx';
import { Observable }           from 'rxjs/Observable';

import {ErrorHandlingService}   from './ErrorHandlingService'
import {LogService}             from './LogService';

@Injectable()
export class DataService {

    errorHandlingService: ErrorHandlingService;
    http: Http;
    headers: Headers;

    constructor(http: Http, errorHandlingService: ErrorHandlingService,
        private logService: LogService) {

        this.http = http;
        this.errorHandlingService = errorHandlingService;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    // Post
    Post(url: string, data: any, callback: (response: any) => void): void {

        var body = JSON.stringify(data);

        this.http.post(url, body, { headers: this.headers })
            .map(response => {
                callback(response);
            })
            .subscribe(
            response => { },
            error => { this.errorHandlingService.HandleError(error); }
            );
    }

    Get(url: string, callback: (data: any) => void): void {
        this.http.get(url).map(response => {
            callback(response);
        })
            .subscribe(
            response => { },
            error => { this.errorHandlingService.HandleError(error); }
            );
    }

    GetAsync(url: string): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.http.get(url)
                .map(response => {
                    self.logService.Log(" Get response from " + url, response);
                    
                    resolve(response);
                })
                .subscribe(
                    response => { },
                    error => { this.errorHandlingService.HandleError(error); }
                );
        });
    }
}