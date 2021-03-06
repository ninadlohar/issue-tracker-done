import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket;
  public url = 'http://localhost:3000';

  constructor(public http: HttpClient) {
    this.socket = io(this.url);
  }

  public verifyUser() {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      });
    });
  }

  public onlineUsersList() {
    return Observable.create((observer) => {
      this.socket.on('online-user-list', (data) => {
        observer.next(data)
      });
    });
  }

  public disconnect() {
    return Observable.create((observer) => {
      this.socket.on('disconnect', () => {
        observer.next();
      });
    });
  }

  public listenAuthError() {
    return Observable.create((observer) => {
      this.socket.on('auth-error', (data) => {
        observer.next(data)
      });
    });
  }

  public getUpdatesFromReporter = (userId) => {
    return Observable.create((observer) => {
      this.socket.on(userId, (data) => {
        observer.next(data);
      });
    });
  }

  /** it means, emit object from frontend to backend for validate and make things run */

  public setUser(authToken) {
    this.socket.emit('set-user', authToken);
  }

  public exitSocket() {
    this.socket.disconnect();
  }

  public notifyUpdates(data) {
    this.socket.emit('notify-updates', data); // we will send this from frontend -> it will have all data
  }

  public disconnectedSocket = () => {
    this.socket.emit('disconnect', '');//end Socket
  }

  /**rocket science */
  public notifyIssueUpdates(data) {
    this.socket.emit('notify-updates-to-issue', data)
  }

  public getIssueUpdates = (issueId) => {
    return Observable.create((observer) => {
      this.socket.on(issueId, (data) => {
        observer.next(data);
      });
    });
  }


}
