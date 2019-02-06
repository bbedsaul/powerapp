import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RiskAssessmentPage } from "../pages/risk-assessment/risk-assessment";
import { WorkPermitPage } from "../pages/work-permit/work-permit";
import { TabsPage } from "../pages/tabs/tabs";
import { SigninPage } from "../pages/signin/signin";
import { AuthService } from "../providers/auth";
import {ForgotpasswordPage} from "../pages/forgotpassword/forgotpassword";
import {Dropbox} from "../providers/dropbox";
import {WorkPermitAddPage} from "../pages/work-permit-add/work-permit-add";
import {WorkPermitDetailPage} from "../pages/work-permit-detail/work-permit-detail";
import {UpdateLinesAddPage} from "../pages/update-lines-add/update-lines-add";
import {RiskAssessmentAddPage} from "../pages/risk-assessment-add/risk-assessment-add";
import {RiskAssessmentDetailPage} from "../pages/risk-assessment-detail/risk-assessment-detail";
import {PdfViewerComponent} from "ng2-pdf-viewer";
import {FieldAuditAddPage} from "../pages/field-audit-add/field-audit-add";
import {FieldAuditPage} from "../pages/field-audit/field-audit";
import {FieldAuditDetailPage} from "../pages/field-audit-detail/field-audit-detail";
import {UtilsService} from "../services/utils";
import {CompanyPage} from "../pages/company/company";
import {UserPage} from "../pages/user/user";
import {CompanyAddPage} from "../pages/company-add/company-add";
import {UserAddPage} from "../pages/user-add/user-add";
import {BrowserModule} from "@angular/platform-browser";
import {AngularFireModule, AuthMethods, AuthProviders} from "angularfire2";
import {environment} from "../environments/environment";
import {FocusInput} from "../components/focus-input/focus-input";
import {HelpdeskPage} from "../pages/helpdesk/helpdesk";

@NgModule({
  declarations: [
    MyApp,
    RiskAssessmentPage,
    RiskAssessmentAddPage,
    RiskAssessmentDetailPage,
    WorkPermitPage,
    WorkPermitAddPage,
    WorkPermitDetailPage,
    UpdateLinesAddPage,
    FieldAuditAddPage,
    FieldAuditPage,
    FieldAuditDetailPage,
    TabsPage,
    SigninPage,
    ForgotpasswordPage,
    HelpdeskPage,
    PdfViewerComponent,
    CompanyAddPage,
    UserAddPage,
    CompanyPage,
    UserPage,
    FocusInput
  ],
  imports: [
    AngularFireModule.initializeApp( environment.firebase, {
      method: AuthMethods.Password,
      provider: AuthProviders.Password
    }),
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RiskAssessmentPage,
    RiskAssessmentDetailPage,
    RiskAssessmentAddPage,
    WorkPermitPage,
    WorkPermitAddPage,
    WorkPermitDetailPage,
    UpdateLinesAddPage,
    FieldAuditPage,
    FieldAuditDetailPage,
    FieldAuditAddPage,
    TabsPage,
    SigninPage,
    ForgotpasswordPage,
    HelpdeskPage,
    CompanyAddPage,
    UserAddPage,
    CompanyPage,
    UserPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UtilsService,
    Dropbox
  ]
})
export class AppModule {
}
