import { Component } from '@angular/core';
import {
  NavController,
  PopoverController,
  LoadingController,
  AlertController
} from "ionic-angular";

import {Dropbox} from "../../providers/dropbox";
import { AuthService } from "../../providers/auth";
import {RiskAssessmentAddPage} from "../risk-assessment-add/risk-assessment-add";
import {RiskAssessmentDetailPage} from "../risk-assessment-detail/risk-assessment-detail";
import {UtilsService} from '../../services/utils';
import {environment} from "../../../../../OneFreePlanet/onefreeplanet/src/environments/environment";

@Component({
  selector: 'page-risk-assessment',
  templateUrl: 'risk-assessment.html'
})
export class RiskAssessmentPage {
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

    this.dropbox.getFolders({path: this.authService.getEraPath()}).subscribe(data => {
      this.folders = data.entries.sort(this.utils.compare);
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }
  gotoRiskAssessmentDetails(event, filename:string) {
    this.nav.push(RiskAssessmentDetailPage, this.authService.getEraPath() + "/" + filename);
  }

  gotoAddRiskAssessment() {
    this.nav.push(RiskAssessmentAddPage);
  }


}
