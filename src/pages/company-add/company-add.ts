import { Component } from '@angular/core';
import {
  AlertController, LoadingController, NavController, NavParams
} from 'ionic-angular';
import {Company} from "../../models/company";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../providers/auth";
import {UtilsService} from "../../services/utils";
import {AngularFireDatabase} from "angularfire2";
import {CompanyPage} from "../company/company";

@Component({
  selector: 'page-company-add',
  templateUrl: 'company-add.html'
})
export class CompanyAddPage {
  private company: Company;
  private index: number;
  private mode: string;
  companyForm: FormGroup;
  editMode:boolean = false;

  constructor(private navParams: NavParams,
              private alertCtrl: AlertController,
              private utilService: UtilsService,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private fdb: AngularFireDatabase,
              private navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyAddPage');
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.company = this.navParams.get('company');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const value = this.companyForm.value;

    // Load the company with new values from the form
    this.company = new Company(
      value.name,
      value.companyname,
      value.description,
      value.eewpUrl,
      value.eraUrl,
      value.auditUrl,
      value.updateUrl
    );

    loading.present();
    this.authService.saveCompany(this.company)
      .then(
        () => loading.dismiss(),
        error => {
          loading.dismiss();
          this.utilService.handleError(error.message, this.alertCtrl);
        }
      );

    this.companyForm.reset();
    this.navCtrl.push(CompanyPage);
  }

  isEditMode() {
    return this.editMode;
  }

  private initializeForm() {
    let name = null;
    let companyname = null;
    let description = null;
    let eewpUrl = null;
    let eraUrl = null;
    let auditUrl = null;
    let updateUrl = null;

    this.editMode=false;

    if (this.mode == 'Edit') {
      this.editMode=true;
      name = this.company.name;
      companyname = this.company.companyname;
      description = this.company.description;
      eewpUrl = this.company.eewpUrl;
      eraUrl = this.company.eraUrl;
      auditUrl = this.company.auditUrl;
      updateUrl = this.company.updateUrl;
    }

    this.companyForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'companyname': new FormControl(companyname, Validators.required),
      'description': new FormControl(description, Validators.required),
      'eewpUrl': new FormControl(eewpUrl, Validators.required),
      'eraUrl': new FormControl(eraUrl, Validators.required),
      'auditUrl': new FormControl(auditUrl, Validators.required),
      'updateUrl': new FormControl(updateUrl, Validators.required),
    });
  }

}
