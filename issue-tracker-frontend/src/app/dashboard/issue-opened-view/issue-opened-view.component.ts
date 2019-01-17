import { Component, OnInit, ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { AppService } from '../../app.service';
import { SocketService } from 'src/app/socket.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-issue-opened-view',
  templateUrl: './issue-opened-view.component.html',
  styleUrls: ['./issue-opened-view.component.css']
})
export class IssueOpenedViewComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  public imageUrl: string
  selectedFile: File;

  public userName: string;
  public userInfo: any;
  public authToken: string;
  public userId: string;
  public allUsersData: any[]
  public allUsers: any[];
 
  public title: string;
  public description: string;
  public assignee: string;
  public assigneeId: string;
  public reporterId: string;
  public reporter: string;
  public status: string;
  public fullName: string;
  public issueId: string;
  public watcherList = []

  public t: string;

  public comment: string;
  createIssue: FormGroup;

  constructor(private toastr: ToastrService,
    public appService: AppService,
    public socketService: SocketService,
    public router: Router) { }

  ngOnInit() {
    this.userName = Cookie.get('receiverName')
    this.authToken = Cookie.get('authToken')
    this.userId = Cookie.get('receiverId')
    this.userInfo = this.appService.getUserInfoFromLocalstorage()
    this.getAllUsersWithoutMe();

    this.createIssue = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, [Validators.maxLength(50), Validators.required]),
      'assignee': new FormControl(null, [Validators.required, Validators.max(1)]),
      'status': new FormControl(null, Validators.required)
    })
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }
      reader.readAsDataURL(this.selectedFile);
      if (this.selectedFile.size > 5000000) {
      }
      if (this.selectedFile.type == "image/png" || this.selectedFile.type == "image/jpeg") {
      } else {
      }
    }
  }

  public getAllUsersWithoutMe = () => {
    this.appService.getUsers(this.authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.allUsersData = apiResponse.data;
          console.log(this.allUsersData)
          this.allUsers = this.allUsersData.filter((v, i) => {
            if (v.userId !== this.userId) {
              return v;
            }
          })
        } else {
          this.toastr.error(apiResponse.message)
        }
      }
        , (error) => {
          this.toastr.error('Something Error Occured')
        });
  }

  onNotification(e) { //done
    let str = e.target.innerText.split(" ");
    if (str[0] == "Issue:") {
      this.router.navigate([`/updateIssue/${str[1]}`]);
    } else {
      console.log("Not a click");
    }
  }


  public createIssueFn = () => {  //done
    if (!this.title) {
      this.toastr.warning('Title is Required')
    } else if (!this.description) {
      this.toastr.warning('Description is Required')
    } else if (!this.assignee) {
      this.toastr.warning('Select the User to assign Task')
    } else if (!this.status) {
      this.toastr.warning('Status is required')
    } else {
      let data = {
        title: this.title,
        description: this.description,
        reporter: this.userName,
        reporterId: this.userId,
        assignee: this.assignee,
        status: this.status,
        screenshot: this.selectedFile
      }
      this.appService.createIssue(data)
        .subscribe((apiResponse) => {
          if (apiResponse.status === 200) {
            this.issueId = apiResponse.data.issueId
            this.t = apiResponse.data.title

            this.toastr.success('Issue Created Successfully')
            let notify = {
              message: `Issue: ${this.issueId} created by ${this.reporter}`,
              userId: data.assignee,
              issueId: this.issueId,
              title: this.t,
              typeOfUpdate: 'created new issue'
            }
            this.notifyToAssignee(notify)
            setTimeout(() => {
              this.router.navigate(['/dashboard'])
            }, 200)
            this.addWatcher('create issue')
          } else {
            this.toastr.warning(apiResponse.message)
          }
        }
          , (error) => {
            this.toastr.error('Something Error Occured')
          })
    }

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

  public notifyToAssignee(data) {
    this.socketService.notifyUpdates(data)
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


  public addWatcher = (typeOfUpdate) => {
    let report = {
      watcherId: this.userId,
      title: this.t,
      issueId: this.issueId,
      typeOfUpdate: typeOfUpdate,
      watcherName: this.userName
    }
    this.appService.addWatcher(report, this.authToken)
      .subscribe((apiResponse) => {
        console.log(apiResponse.data)
      })
  }


}
