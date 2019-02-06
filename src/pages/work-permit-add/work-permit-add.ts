import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';
import {WorkPermitPage} from "../work-permit/work-permit";
import {AuthService} from "../../providers/auth";

@Component({
  selector: 'page-add-work-permit',
  templateUrl: 'work-permit-add.html'
})
export class WorkPermitAddPage {
  formUrl:string;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private sanitizer: DomSanitizer,
              private authServ:AuthService) {
    console.log("Constructor of WorkPermitAddPage");
    this.formUrl = this.authServ.getFormUrl('EEWP');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkPermitAddPage');
  }

  ionViewWillLoad() {
    console.log("ionViewWillLoad WorkPermitAddPage");
  }

  getIframeSrc() {
    console.log("getting iframe src for WorkPermitAddPage");
      let url = this.formUrl + "?dropboxpath=" + this.authServ.getEewpPath();
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  gotoWorkPermitList() {
    this.navCtrl.push(WorkPermitPage);
  }
}
