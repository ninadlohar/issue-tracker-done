import { Component, OnInit, ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { ToastrService, ToastContainerDirective} from 'ngx-toastr';
import { AppService } from '../../app.service';
import { SocketService } from 'src/app/socket.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-issue-dashboard',
  templateUrl: './issue-dashboard.component.html',
  styleUrls: ['./issue-dashboard.component.css']
})
export class IssueDashboardComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatSort) sort1: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  listData: MatTableDataSource<any>
  displayedColumns: string[] = ['title', 'issueId', 'reporter', 'status', 'createdOn'];
  searchKey: string;

  listData1: MatTableDataSource<any>
  displayedColumns1: string[] = ['title', 'issueId', 'reporter', 'status', 'createdOn'];
  searchKey1: string;
 

  public userName: string;
  public userInfo: any;
  public authToken: string;
  public userId: string;
  public allUsersData: any[]
  public allUsers: any[];

  public getAllIssuesExceptMineArr: any[];
  public getAllIssuesExcept: any[];

  public titleFilter: string;
  public statusFilter: string;
  public reporterFilter: string;

  public title: string;
  public description: string;
  public assignee: string;
  public reporterId: string;
  public reporter: string;
  public status: string;
  public allIssues;
  public allIssuesByReporter: any;
  public issuesLoaded = false
  public p: number = 1;
  public g: number = 1;

  constructor(private toastr: ToastrService,
    public appService: AppService,
    public socketService: SocketService,
    public router: Router) { }

  ngOnInit() {
    this.toastr.overlayContainer = this.toastContainer;
    this.userName = Cookie.get('receiverName')
    this.authToken = Cookie.get('authToken')
    this.userId = Cookie.get('receiverId')
    this.userInfo = this.appService.getUserInfoFromLocalstorage()
    this.titleFilter = '';
    this.statusFilter = '';
    this.reporterFilter = '';
    this.getAllUsers();
    this.getAllIssuesByAssignee();
    this.getUpdatesFromReporter();
    this.x1()
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter1() {
    this.listData1.filter = this.searchKey1.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = ''
    this.applyFilter()
  }

  onSearchClear1() {
    this.searchKey1 = ''
    this.applyFilter1()
  }


  public getAllUsers = () => {
    this.appService.getUsers(this.authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.allUsersData = apiResponse.data;
        } else {
          this.toastr.error(apiResponse.message)
        }
      }
        , (error) => {
          this.toastr.error('Some Error Occured')
        });
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

  public linkToCreateIssue = () => {
    this.router.navigate(['/create-issue'])
  }

  public navigateToIssue: any = (issueId) => {
    this.router.navigate(['/updateIssue/' + issueId])
  }

  public getAllIssuesByAssignee = () => {
    this.appService.getIssuesByAssignee(this.userId, this.authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success('Issues Found');
          this.allIssues = apiResponse.data
          this.listData = new MatTableDataSource(this.allIssues)
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        } else {
          this.allIssues = false;
          this.toastr.info(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('Server Error!')
      })
  }

  public getUpdatesFromReporter() {
    this.socketService.getUpdatesFromReporter(this.userId).subscribe((data) => {
      this.getAllIssuesByAssignee()
      this.toastr.success(data.message, data.typeOfUpdate, {
        timeOut: 3000, tapToDismiss: true
      })
    })
  }

  onNotification(e) {
    let str = e.target.innerText.split(" ");
    if (str[0] == "Issue:") {
      this.router.navigate([`/updateIssue/${str[1]}`]);
    } else {
      console.log("Not a click");
    }
  }


  public x1() { // this function is same as getAllIssues()
    this.appService.x(this.authToken, this.userId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.getAllIssuesExcept = apiResponse.data
          console.log(apiResponse.data)
          this.listData1 = new MatTableDataSource(this.getAllIssuesExcept)
          this.listData1.sort = this.sort1;
          this.listData1.paginator = this.paginator;
        }
      })
  }
}

