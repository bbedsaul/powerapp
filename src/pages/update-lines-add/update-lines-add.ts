import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from "../../providers/auth";

@Component({
  selector: 'page-update-lines-add',
  templateUrl: 'update-lines-add.html'
})
export class UpdateLinesAddPage {
  formUrl:string;
  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private sanitizer: DomSanitizer,
              private authServ:AuthService) {
    this.formUrl = authServ.getFormUrl('LINE');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateLinesAddPage');
  }

  getIframeSrc() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.formUrl);
  }

}

