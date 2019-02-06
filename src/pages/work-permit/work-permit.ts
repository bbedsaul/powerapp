import { Component } from '@angular/core';
import {PopoverController, LoadingController, AlertController, NavController} from "ionic-angular";

import { AuthService } from "../../providers/auth";
import {Dropbox} from "../../providers/dropbox";
import {WorkPermitAddPage} from "../work-permit-add/work-permit-add";
import {WorkPermitDetailPage} from "../work-permit-detail/work-permit-detail";
import {UtilsService} from "../../services/utils";
import {environment} from "../../../../../OneFreePlanet/onefreeplanet/src/environments/environment";

@Component({
  selector: 'page-work-permit',
  templateUrl: 'work-permit.html'
})
export class WorkPermitPage {
  folders: any;
  depth: number = 0;
  backimg;

  constructor(private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private nav: NavController,
              private dropbox: Dropbox,
              private utils: UtilsService,
              private alertCtrl: AlertController) {
    this.backimg = 'img/letsstart.jpg';
  }

  ionViewWillEnter(){

    this.dropbox.setAccessToken(environment.dropbox.apiKey);
    this.folders = [];

    let loading = this.loadingCtrl.create({
      content: 'Syncing from Dropbox...'
    });

    loading.present();

    this.dropbox.getFolders({ path: this.authService.getEewpPath() }).subscribe(data => {
      this.folders = data.entries.sort(this.utils.compare);
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }

  gotoWorkPermitDetailPage(event, filename:string) {
    this.nav.push(WorkPermitDetailPage, this.authService.getEewpPath() + "/" + filename);
  }

  gotoAddWorkPermitPage() {
    this.nav.push(WorkPermitAddPage);
  }

}
