import { Component } from '@angular/core';
import {
  AlertController, LoadingController, NavController, NavParams
} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FirebaseListObservable} from "angularfire2";
import {AuthService} from "../../providers/auth";
import {UtilsService} from "../../services/utils";
import {User} from "../../models/user";

@Component({
  selector: 'page-user-add',
  templateUrl: 'user-add.html'
})
export class UserAddPage {
  private index: number;
  private mode: string;
  userForm: FormGroup;
  private user: User;
  private userKey:number;
  private selectCompany: FirebaseListObservable<any>;
  public userTypes:[string] = [ 'User', 'Admin'];
  private editMode = false;

  constructor(private navParams: NavParams,
              private utilService: UtilsService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private navCtrl: NavController) {

    this.selectCompany = authService.getCompanies();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAddPage');
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.user = this.navParams.get('user');
      this.userKey = this.navParams.get('user').$key;
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit() {
    //registers the user and logs them in
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    const value = this.userForm.value;
    const formUser = new User(value.username, value.firstname,
                          value.lastname, value.emailaddress,
                          value.companyname, value.adminuser);

    loading.present();

      if(this.editMode) {
        this.authService.updateUserInfo(this.userKey, formUser)
          .then(() => {
            loading.dismiss();
          })
          .catch((error) => {
            loading.dismiss();
            this.utilService.handleError(error.message, this.alertCtrl);
          });

      } else {

        this.authService.registerUser(value.emailaddress, value.password).then((user) => {
          this.authService.saveUserInfoFromForm(user.uid, formUser)
            .then(() => {
            loading.dismiss();
          })
            .catch((error) => {
              loading.dismiss();
              this.utilService.handleError(error.message, this.alertCtrl);
            });
        })
        .catch((error) => {
          // if we catch this error, we need to delete the authentication account.
          loading.dismiss();
          this.utilService.handleError(error.message, this.alertCtrl);
          // Delete account
        });
      }

    this.userForm.reset();
    this.navCtrl.pop();
  }

  isEditMode() {
    return this.editMode;
  }

  private initializeForm() {
    let username = null;
    let firstname = null;
    let lastname = null;
    let emailaddress = null;
    let password = null;
    let company = null;
    let adminuser = null;

    this.editMode = false;

    if (this.mode == 'Edit') {
      this.editMode = true;
      username = this.user.username;
      firstname = this.user.firstname;
      lastname = this.user.lastname;
      emailaddress = this.user.emailaddress;
      adminuser = this.user.adminuser;
      company = this.user.companyname;
    }

    this.userForm = new FormGroup({
      'username': new FormControl(username, Validators.required),
      'firstname': new FormControl(firstname, Validators.required),
      'lastname': new FormControl(lastname, Validators.required),
      'emailaddress': new FormControl(emailaddress, Validators.required),
      'password': new FormControl(password, Validators.required),
      "adminuser": new FormControl(adminuser),
      'companyname': new FormControl(company, Validators.required)
    });

    if(this.editMode) {
      this.userForm.get('username').disable(true);
      this.userForm.get('emailaddress').disable(true);
      this.userForm.get('password').disable(true);
    }
  }
}
