import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import {FieldAuditPage} from "../field-audit/field-audit";
import {AuthService} from "../../providers/auth";

@Component({
  selector: 'page-field-audit-add',
  templateUrl: 'field-audit-add.html'
})
export class FieldAuditAddPage {

  formUrl:string;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private sanitizer: DomSanitizer,
              private authServ:AuthService) {

    this.formUrl = authServ.getFormUrl('AUDIT');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldAuditAddPage');
  }

  getIframeSrc() {
    let url = this.formUrl + "?dropboxpath=" + this.authServ.getAuditPath();
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  gotoFieldAuditList() {
    this.navCtrl.push(FieldAuditPage);
  }
}