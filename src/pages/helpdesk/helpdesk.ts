import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'page-helpdesk',
  templateUrl: 'helpdesk.html'
})
export class HelpdeskPage {
  formUrl:string = "https://greentie.formstack.com/forms/facility_safety_application_app_inquiry";

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiskAssessmentAddPage');
  }

  getIframeSrc() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.formUrl);
  }
}
