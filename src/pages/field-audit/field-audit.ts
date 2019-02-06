import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, PopoverController} from 'ionic-angular';
import { AuthService } from "../../providers/auth";
import {FieldAuditDetailPage} from "../field-audit-detail/field-audit-detail";
import {FieldAuditAddPage} from "../field-audit-add/field-audit-add";
import {Dropbox} from "../../providers/dropbox";
import {UtilsService} from "../../services/utils";
import {environment} from "../../../../../OneFreePlanet/onefreeplanet/src/environments/environment";

@Component({
  selector: 'page-field-audit',
  templateUrl: 'field-audit.html'
})
export class FieldAuditPage {
  folders: any;
  depth: number = 0;

  constructor(private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private nav: NavController,
              private dropbox: Dropbox,
              private utils: UtilsService,
              private alertCtrl: AlertController) {
  }

  ionViewWillEnter(){

    this.dropbox.setAccessToken(environment.dropbox.apiKey);
    this.folders = [];

    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });

    loading.present();

    this.dropbox.getFolders({path: this.authService.getAuditPath()}).subscribe(data => {
      this.folders = data.entries.sort(this.utils.compare);
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }
  gotoFieldAuditDetails(event, filename:string) {
    this.nav.push(FieldAuditDetailPage, this.authService.getAuditPath() + "/" + filename);
  }

  gotoAddFieldAudit() {
    this.nav.push(FieldAuditAddPage);
  }
}
