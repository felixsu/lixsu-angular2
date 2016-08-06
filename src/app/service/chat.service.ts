import * as io from "socket.io-client";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable, Component } from '@angular/core';

@Injectable()
export class ChatService {
    private socketUrl : string = "http://localhost:8080/hello";
    private socket : any;

    sendMessage(message){
        this.socket.emit('add-message', message);    
    }

    getMessages() {
        let observable = new Observable(observer => {
            this.socket = io(this.socketUrl);
            this.socket.on('message', (data) => {
                observer.next(data);    
            });

            return () => {this.socket.disconnect();};  
        })     
        return observable;
    }  
}