import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueDashboardComponent } from './issue-dashboard/issue-dashboard.component';
import { IssueOpenedViewComponent } from './issue-opened-view/issue-opened-view.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateIssueComponent } from './update-issue/update-issue.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule,ToastContainerModule } from 'ngx-toastr';
import { TitleFilter } from './pipes/title.filter';
import { StatusFilter } from './pipes/status.filter';
import { ReporterFilter } from './pipes/reporter.filter';
import { NgxPaginationModule } from 'ngx-pagination'; ''
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxEditorModule } from 'ngx-editor';
import { MaterialModule } from '../material/material.module';
import { IssueTrackerRouteGaurdService } from './route.guard';

@NgModule({
  declarations: [IssueDashboardComponent, TitleFilter, StatusFilter, ReporterFilter, IssueOpenedViewComponent, UpdateIssueComponent],
  providers: [],
  imports: [
    CommonModule,
    MaterialModule,
    FileUploadModule,
    NgxEditorModule,
    ToastContainerModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
      // timeOut: 2000,
    }),
    RouterModule.forChild([
      { path: 'dashboard', component: IssueDashboardComponent, canActivate: [IssueTrackerRouteGaurdService] },
      { path: 'create-issue', component: IssueOpenedViewComponent, canActivate: [IssueTrackerRouteGaurdService] },
      { path: 'updateIssue/:issueId', component: UpdateIssueComponent, canActivate: [IssueTrackerRouteGaurdService] }
    ])
  ]
})
export class DashboardModule { }
