import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import { LoadingController, AlertController } from "ionic-angular";

import { AuthService } from "../../providers/auth";
import {Keyboard} from "ionic-native";

@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class ForgotpasswordPage {

  @ViewChild('focusInput') myInput;

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewLoaded() {

    setTimeout(() => {
      Keyboard.show() // for android
      this.myInput.setFocus();
    },150); //a least 150ms.

  }

  onForgotPassword(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Sending email for password reset...'
    });
    loading.present();
    this.authService.sendForgotPassword(form.value.email)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Error Sending Email!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
