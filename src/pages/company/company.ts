import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Company} from "../../models/company";
import {CompanyAddPage} from "../company-add/company-add";
import {AuthService} from "../../providers/auth";
import {UtilsService} from "../../services/utils";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'page-customer',
  templateUrl: 'company.html'
})
export class CompanyPage {
  private companies: FirebaseListObservable<Company[]>;

  constructor(public navCtrl: NavController,
              private authService: AuthService,
              private alertCtlr: AlertController,
              private utilService: UtilsService,
              public navParams: NavParams) {

    this.companies = authService.getCompanies();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPage');
  }

  gotoAddCompany(event, mode: string, company:Company, index:number ) {
    this.navCtrl.push(CompanyAddPage, { mode: mode, company: company, index: index });
  }
}
