import { Component, OnInit, OnDestroy } from '@angular/core';

declare var SockJS;

@Component({
    moduleId: module.id,
    selector: 'web-socket-component',
    templateUrl: 'web-socket.component.html',
    styleUrls: ['web-socket.component.css'],
})
export class WebSocketComponent implements OnInit, OnDestroy {
    socket : any = null;
    receivedMsg : string = null;
    createdMsg : string = "put your name";

    ngOnInit(){
        this.receivedMsg = "empty";
        this.socket = new SockJS('http://localhost:8080/greeting');
        this.socket.onopen = this.sockOnOpen;
        this.socket.onmessage = this.onMessageReceived;
        this.socket.onclose = this.sockOnClose;
    }  

    ngOnDestroy() {
        this.socket.close();
    } 

    sendMessage(){
        console.log("send: " + this.createdMsg);
        this.socket.send(this.createdMsg);
    }

    onMessageReceived(data){
        console.log(data);
        console.log('message received: ', data.data);
        this.receivedMsg = data.data;
        console.log("text should updated : " + this.receivedMsg);
    }

    sockOnOpen() {
        console.log('entering open sock');
    }

    sockOnClose() {
        console.log('entering sock close');
    }
}