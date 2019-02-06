import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {Dropbox} from "../../providers/dropbox";
import {environment} from "../../../../../OneFreePlanet/onefreeplanet/src/environments/environment";

@Component({
  selector: 'page-field-audit-detail',
  templateUrl: 'field-audit-detail.html'
})
export class FieldAuditDetailPage {
  private filename: string;
  private pathandname: string;
  private fileUrl: string;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private loadingCtl: LoadingController,
              private dropbox: Dropbox) {}

  ionViewWillEnter() {
    this.dropbox.setAccessToken(environment.dropbox.apiKey);

    this.dropbox.getFileUrl({ path: this.pathandname }).subscribe(data => {
      this.fileUrl = data.link;
      console.log("got temporary download url: " + this.fileUrl);
    }, (err) => {
      console.log(err);
    });
    console.log('ionViewWillEnter FieldAuditDetailPage');
  }

  ngOnInit() {
    this.pathandname = this.navParams.data;
    console.log("Got the pathandname as : " + this.pathandname);
    this.filename = this.pathandname.substring(this.pathandname.lastIndexOf("/") + 1);
    console.log("Got the filename as : " + this.filename);
  }

}