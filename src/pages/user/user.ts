import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserAddPage} from "../user-add/user-add";
import {FirebaseListObservable} from "angularfire2";
import {AuthService} from "../../providers/auth";
import {User} from "../../models/user";

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  private users: FirebaseListObservable<User[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService) {

    this.users = authService.getUsers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  gotoAddUser(event, mode: string, user:User, index:number ) {
    this.navCtrl.push(UserAddPage, { mode: mode, user: user, index: index });
  }

}
