import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket;

  constructor() {
    this.socket = io.connect('http://127.0.0.1:5000/');
    this.sendMessage('Hello to server');
  }
  public sendMessage(message): void {
    this.socket.emit('connect');
  }
  public response = () => {
    return new Observable(observer => {
      this.socket.on('new employee', message => {
        observer.next(message);
      });
    });
  }
}
