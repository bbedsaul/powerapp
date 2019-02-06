import { Component, ViewChild } from '@angular/core';
import {Platform, NavController, MenuController} from 'ionic-angular';
import {InAppBrowser, StatusBar} from 'ionic-native';

import { TabsPage } from "../pages/tabs/tabs";
import { SigninPage } from "../pages/signin/signin";
import {WorkPermitAddPage} from "../pages/work-permit-add/work-permit-add";
import {RiskAssessmentAddPage} from "../pages/risk-assessment-add/risk-assessment-add";
import {UpdateLinesAddPage} from "../pages/update-lines-add/update-lines-add";
import {FieldAuditAddPage} from "../pages/field-audit-add/field-audit-add";
import {CompanyPage} from "../pages/company/company";
import {UserPage} from "../pages/user/user";
import {AngularFire} from "angularfire2";
import {AuthService} from "../providers/auth";
import {User} from "../models/user";
import {HelpdeskPage} from "../pages/helpdesk/helpdesk";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SigninPage;
  signinPage = SigninPage;
  eewpPage = WorkPermitAddPage;
  riskPage = RiskAssessmentAddPage;
  updateLinePage = UpdateLinesAddPage;
  fieldAuditPage = FieldAuditAddPage;
  companyPage = CompanyPage;
  helpdeskPage = HelpdeskPage;
  userPage = UserPage;
  isAuthenticated = false;
  isAdminUser = false;
  userSub;
  companySub;

  @ViewChild('nav') nav: NavController;

  signupUrl:string = "https://greentie.formstack.com/forms/facility_safety_application_app_inquiry";
  user: User; // the current users full record

  constructor(public platform: Platform,
              private menuCtrl: MenuController,
              private fireAuth: AngularFire,
              private authService: AuthService) {


    fireAuth.auth.subscribe( user => {
      if (user) {
        console.log("Current logged in uid::" + user.auth.uid);
        const userInfo = authService.getCurrentUserInfo(user.auth.uid);

        if(userInfo) {
          this.userSub = userInfo.subscribe(val => {
            if (val.length == 1) this.user = val[0];
            if (val.length == 1 && val[0].adminuser == 'Admin') {
              this.isAdminUser = true;
              this.isAuthenticated = true;
            } else {
              this.isAuthenticated = true;
              this.isAdminUser = false;
            }
            authService.setCurrentUser(this.user);
            const companyInfo = authService.getCompanyInfo(this.user.companyname);
            if(companyInfo) {
              this.companySub = companyInfo.subscribe( companyval => {

                if (companyval.length == 1) this.authService.setCurrentCompany(companyval[0]);
                this.rootPage = TabsPage;
              });
            }
          });
        }
      } else {
        this.isAuthenticated = false;
        this.isAdminUser = false;
        this.rootPage = SigninPage;
        if(this.userSub) this.userSub.unsubscribe();
        if(this.companySub) this.companySub.unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //Splashscreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.fireAuth.auth.logout();
    this.isAdminUser = false;
    this.isAuthenticated = false;

   // this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
    this.menuCtrl.close();
  }

  gotoSignup() {
    this.gotoUrl(this.signupUrl);
    this.menuCtrl.close();
  }

  gotoUrl(url:string) {
    this.platform.ready().then(() => {
      new InAppBrowser(url, '_blank');
    });
  }
}
