import { Component, OnInit, ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Location } from '@angular/common';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { AppService } from '../../app.service';
import { SocketService } from 'src/app/socket.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.css']
})
export class UpdateIssueComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  public userName: string;
  public userInfo: any;
  public authToken: string;
  public userId: string;
  public allUsersData: any[];
  public allUsers: any[];

  public previous: any

  public watcherNames
  public arr = []
  public bbq = []

  public comment: string;
  public allComments = new Array()
  public commentedByName: string;
  public userList = []
  public title: string;
  public description: string;
  public assignee: string;
  public assigneeId: string;
  public reporterId: string;
  public reporter: string;
  public status: string;
  public modifiedOn: any
  public createdOn: any;

  public issueId: string;
  public issue: any;
  public p: number = 1;
  public q: number = 1;

  public imageUrl
  public selectedFile: File = null;

  public watcherList = new Array()

  public x = []
  public y: number

  config: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'left',
    verticalPosition: 'top',
  }


  constructor(public route: ActivatedRoute,
    private router: Router,
    public appService: AppService,
    public socketService: SocketService,
    public toastr: ToastrService,
    public location: Location,
    public snack: MatSnackBar) { }

  ngOnInit() {
    this.issueId = this.route.snapshot.paramMap.get('issueId');
    this.userName = Cookie.get('receiverName')
    this.authToken = Cookie.get('authToken');
    this.userId = Cookie.get('receiverId');
    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    this.getSingleIssue();
    this.getAllUsersWithoutMe();
    this.getAllComments();
    this.getUpdate()
    this.getWatchersOfIssue()
    this.commentedByName = Cookie.get('receiverName')
  }

  public logout: any = () => {
    this.appService.logout(this.userId, this.authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          console.log('successfully logout')
          Cookie.delete('authToken');
          Cookie.delete('receiverId');
          Cookie.delete('receiverName');
          this.socketService.disconnectedSocket()
          this.socketService.exitSocket()
          this.router.navigate(['/']);
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('Something Error Occured')
      }
      );
  }

  public getSingleIssue = () => {
    this.appService.getSingleIssue(this.issueId, this.authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.imageUrl = `http://localhost:3000/uploads/${apiResponse.screenshot}`
          this.toastr.success('Issue Found');
          this.issue = apiResponse.data;
          this.title = this.issue[0].title;
          this.status = this.issue[0].status;
          this.description = this.issue[0].description;
          this.reporter = this.issue[0].reporter;
          this.assignee = this.issue[0].assginee;
          this.createdOn = this.issue[0].createdOn;
          this.previous = this.issue[0].screenshot;
        } else {
          this.toastr.error(apiResponse.message);
        }
      }, (error) => {
        this.toastr.error('Server Error!');
      })
  }

  public getAllUsersWithoutMe = () => {
    this.appService.getUsers(this.authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.allUsersData = apiResponse.data;

          this.allUsers = this.allUsersData.filter((v, i) => {
            if (v.userId !== this.userId) {
              return v;
            }
          })
        } else {
          this.toastr.info(apiResponse.message)
        }
      },
        (error) => {
          this.toastr.error('Server Error!');
        }
      )
  }

  // public notifyToAssignee(data) {
  //   this.socketService.notifyUpdates(data)
  // }

  public updateIssue() {
    if (!this.title) {
      this.toastr.warning('Title is Required')
    } else if (!this.status) {
      this.toastr.warning('Status is Required')
    } else if (!this.description) {
      this.toastr.warning('Description is Required')
    } else if (!this.assignee) {
      this.toastr.warning('Select Assignee')
    } else {
      let data = {
        title: this.title,
        status: this.status,
        modifiedOn: this.modifiedOn,
        description: this.description,
        assignee: this.assignee,
        issueId: this.issueId,
        screenshot: this.selectedFile,
        previous: this.previous,
      }
      this.appService.updateSelectedIssue(data)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success('Issue Updated Successfully');
            setTimeout(() => {
              this.router.navigate(['/dashboard'])
            }, 200)
            let notify = {
              message: `Issue: ${this.issueId} updated by ${this.reporter}`,
              userId: data.assignee,
              issueId: this.issueId,
              title: this.title,
              typeOfUpdate: 'updated issue'
            }
            this.notifyToAssignee(notify)
            this.socketService.notifyIssueUpdates(notify)
            this.addWatcher('update issue')
          } else {
            this.toastr.info(apiResponse.message);
          }
        }, (error) => {
          this.toastr.error('Server Error!');
        })
    }
  }

  public notifyToAssignee(data) {
    this.socketService.notifyUpdates(data)
  }

  onNotification(e) { //done
    let str = e.target.innerText.split(" ");
    if (str[0] == "Issue:") {
      this.router.navigate([`/updateIssue/${str[1]}`]);
    } else {
      console.log("Not a click");
    }
  }

  public createComment = () => {
    if (!this.comment) {
      this.toastr.warning('Comment is Required')
    } else {
      let data = {
        comment: this.comment,
        commentedByName: this.userName,
        issueId: this.issueId,
      }
      this.appService.createComment(data, this.authToken)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            this.toastr.success('Comment Created');
            let notify = {
              message: `Issue: ${this.issueId} commented by ${data.commentedByName}`,
              userId: this.userId,
              issueId: this.issueId,
              title: this.title,
              typeOfUpdate: 'updated issue'
            }
            this.allComments.push(apiResponse.data)
            this.notifyToAssignee(notify)
            this.socketService.notifyIssueUpdates(notify)
            this.addWatcher('comment')
          } else {
            this.toastr.info(apiResponse.message);
          }
        }, (error) => {
          this.toastr.error('Server Error');
        })
    }
  }

  public nio(data) { // not used
    this.socketService.notifyIssueUpdates(data)
  }

  public getAllComments = () => {
    this.appService.getCommentsById(this.issueId, this.authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.allComments = apiResponse.data.reverse();
          this.toastr.success('All Comments Fetched');
        } else {
          this.toastr.info(apiResponse.message)
        }
      }, (error) => {
        this.toastr.error('Server Error!');
      })
  }


  public getUpdate() {
    this.socketService.getUpdatesFromReporter(this.userId).subscribe((data) => {
      this.getAllComments();
      this.toastr.success(data.message, data.typeOfUpdate, {
        timeOut: 3000, tapToDismiss: true
      })
    })
    this.socketService.getIssueUpdates(this.issueId).subscribe((data) => {
      this.toastr.success(data.message, data.typeOfUpdate, {
        timeOut: 3000, tapToDismiss: true
      })
    })
  }

  public goBack() {
    this.location.back();
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0]
    if (this.selectedFile) {
      let reader = new FileReader()
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result
      }
      reader.readAsDataURL(this.selectedFile);
      if (this.selectedFile.size > 5000000) {
        this.toastr.error('File Size Too Large')
      }
      if (this.selectedFile.type == 'image/png' || this.selectedFile.type == 'image/jpeg') {
      } else {
        this.toastr.error('Make Sure you upload JPEG or PNG format image')
      }
    }
  }

  editorConfig: NgxEditorModule = {
    "minHeight": "3rem",
    "imageEndPoint": "",
    "toolbar": [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
    ]
  }

  public deleteComment(commentId) {
    this.appService.deleteComment(this.authToken, commentId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.appService.success('Comment Deleted')
          this.allComments.map((i, index, a2) => {
            if (index < 1) {
              a2.splice(index, 1)
            }
          })
        } else {
          this.appService.success(apiResponse.message)
        }
      })
  }

  public addWatcher = (typeOfUpdate) => {
    let report = {
      watcherId: this.userId,
      title: this.title,
      issueId: this.issueId,
      typeOfUpdate: typeOfUpdate,
      watcherName: this.userName
    }
    this.appService.addWatcher(report, this.authToken)
      .subscribe((apiResponse) => {

      })
  }

  public getWatchersOfIssue = () => {
    this.appService.getWatchersOfIssue(this.authToken, this.issueId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.bbq = apiResponse.data.map((v, i) => {
            this.socketService.getUpdatesFromReporter(v.watcherId)
          })
          this.arr = apiResponse.data.map((v, i) => { return v.watcherName })
          this.watcherNames = this.arr.reduce((a, b) => {
            if (a.indexOf(b) < 0) a.push(b)
            return a
          }, [])
          // console.log(this.watcherNames)
        }
      })
  }
}






