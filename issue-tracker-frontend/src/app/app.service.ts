import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  issueId
  constructor(public http: HttpClient, public snack: MatSnackBar, public router: Router) {
  }
  private url = 'http://localhost:3000';

  success(msg) {
    this.config['panelClass'] = ['notifcation', 'success']
    this.snack.open(msg, '', this.config)
  }

  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  }

  public signUpFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  }

  public loginFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
    return this.http.post(`${this.url}/api/v1/users/login`, params);
  }

  public forgotPassword(data): Observable<any> {
    const response = new HttpParams()
      .set('email', data.email)
    return this.http.post(`${this.url}/api/v1/users/forgotPassword`, response);
  }

  public resetPassword(data): Observable<any> {
    const params = new HttpParams()
      .set('userId', data.userId)
      .set('password', data.password)
    return this.http.post(`${this.url}/api/v1/users/resetPassword`, params);
  }

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  public logout(userId, authToken): Observable<any> {
    const params = new HttpParams()
      .set('authToken', authToken)
    return this.http.post(`${this.url}/api/v1/users/logout/${userId}`, params)
  }

  public getUsers(authToken): Observable<any> {
    return this.http.get(`${this.url}/api/v1/users/view/all?authToken=${authToken}`);
  }

  /** issue controller */

  public createIssue = (data): Observable<any> => {
    const fd = new FormData();
    fd.append('image', data.screenshot)
    fd.append('title', data.title)
    fd.append('status', data.status)
    fd.append('description', data.description)
    fd.append('assignee', data.assignee)
    fd.append('reporter', data.reporter)
    fd.append('reporterId', data.reporterId)
    return this.http.post(`${this.url}/api/v1/issue/createIssue`, fd)
  }

  public getAllIssues = (authToken): Observable<any> => {
    return this.http.get(`${this.url}/api/v1/issue/getAllIssues?authToken=${authToken}`)
  }

  public x = (authToken, userId): Observable<any> => {
    return this.http.get(`${this.url}/api/v1/issue/x/${userId}?authToken=${authToken}`)
  }

  // public updateSelectedIssue = (data, issueId): Observable<any> => {
  //   const fd = new FormData()
  //   fd.append('title', data.title)
  //   fd.append('description', data.description)
  //   fd.append('status', data.status)
  //   fd.append('assignee', data.assignee)
  //   fd.append('modifiedOn', data.modifiedOn)
  //   fd.append('authToken', data.authToken)
  //   // fd.append('image', data.screenshot)
  //   // fd.append('previous', data.previous)
  //   return this.http.put(`${this.url}/api/v1/issue/updateIssue/${issueId}`, fd)
  // }

  public updateSelectedIssue = (data): Observable<any> => {
    const fd = new FormData()
    fd.append('image', data.screenshot)
    fd.append('title', data.title)
    fd.append('status', data.status)
    fd.append('description', data.description)
    fd.append('assignee', data.assignee)
    fd.append('modifiedOn', data.modifiedOn)
    fd.append('previous', data.previous)
    return this.http.put(`${this.url}/api/v1/issue/updateIssue/${data.issueId}`, fd)
  }

  public getSingleIssue = (issueId, authToken): Observable<any> => {
    return this.http.get(`${this.url}/api/v1/issue/getSingleIssue/${issueId}?authToken=${authToken}`)
  }

  // comments model

  public createComment = (data, authToken): Observable<any> => {
    const params = new HttpParams()
      .set('issueId', data.issueId)
      .set('comment', data.comment)
      .set('commentedByName', data.commentedByName)
    return this.http.post(`${this.url}/api/v1/comments/createComment?authToken=${authToken}`, params)
  }

  public getCommentsById = (issueId, authToken): Observable<any> => {
    return this.http.get(`${this.url}/api/v1/comments/commentBy/${issueId}?authToken=${authToken}`)
  }

  public getIssuesByAssignee = (assignee, authToken): Observable<any> => {
    return this.http.get(`${this.url}/api/v1/issue/getIssuesByAssignee/${assignee}?authToken=${authToken}`);
  }

  public deleteComment = (authToken, commentId): Observable<any> => {
    return this.http.delete(`${this.url}/api/v1/comments/delete/${commentId}?authToken=${authToken}`);
  }

  public addWatcher = (data, authToken): Observable<any> => {
    const params = new HttpParams()
      .set('watcherId', data.watcherId)
      .set('issueId', data.issueId)
      .set('typeOfUpdate', data.typeOfUpdate)
      .set('title', data.title)
      .set('watcherName', data.watcherName)
    return this.http.post(`${this.url}/api/v1/watcher/add?authToken=${authToken}`, params)
  }

  public getWatchersOfIssue = (authToken, issueId): Observable<any> => {
    return this.http.get(`${this.url}/api/v1/watcher/getAllWatchers/${issueId}?authToken=${authToken}`)
  }

  // public getIssuesByReporter = (reporterId, authToken): Observable<any> => {
  //   return this.http.get(`${this.url}/api/v1/issue/getIssuesByReporter/${reporterId}?authToken=${authToken}`);
  // }
}
