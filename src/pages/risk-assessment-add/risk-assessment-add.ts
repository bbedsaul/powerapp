import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import {RiskAssessmentPage} from "../risk-assessment/risk-assessment";
import {AuthService} from "../../providers/auth";

@Component({
  selector: 'page-risk-assessment-add',
  templateUrl: 'risk-assessment-add.html'
})
export class RiskAssessmentAddPage {

  formUrl:string;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private sanitizer: DomSanitizer,
              private authServ:AuthService) {
    this.formUrl = authServ.getFormUrl('ERA');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiskAssessmentAddPage');
  }

  getIframeSrc() {
    let url = this.formUrl + "?dropboxpath=" + this.authServ.getEraPath();
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  gotoRiskAssessmentList() {
    this.navCtrl.push(RiskAssessmentPage);
  }
}
