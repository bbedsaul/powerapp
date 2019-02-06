import {Component} from '@angular/core';
import { NgForm } from "@angular/forms";
import {LoadingController, AlertController, NavController} from "ionic-angular";

import { AuthService } from "../../providers/auth";
import { ForgotpasswordPage } from "../forgotpassword/forgotpassword";
import {AngularFire} from "angularfire2";
import {User} from "../../models/user";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  forgotpasswordPage = ForgotpasswordPage;

  constructor(private nav: NavController,
              private af: AngularFire,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private alertCtrl: AlertController) {
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();

    this.authService.signin(form.value.email, form.value.password)
      .then((success) => {
      console.log(success);
      const newuser = new User("","","","","","");
      this.authService.setCurrentUser(newuser);
      loading.dismiss();
      })
      .catch((err: any) => {
          console.log(err);
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Signin failed!',
            message: err.message,
            buttons: ['Ok']
          });
          alert.present();
      });
  }

  /*
  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authService.signin({
      email: form.value.email,
      password: form.value.password
    }).then(
      (success) => {
        console.log(success);
        loading.dismiss();
      }).catch(
      (err) => {
        console.log(err);
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: err.message,
          buttons: ['Ok']
        });
        alert.present();
      });

*/
    /*
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
     */
  gotoForgotPasswordPage() {
    this.nav.setRoot(this.forgotpasswordPage);
  }
}
