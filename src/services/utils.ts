
import {AlertController} from "ionic-angular";
export class UtilsService {

  compare(a,b) {
    if (a.name > b.name)
      return -1;
    if (a.name < b.name)
      return 1;
    return 0;
  }

  handleError(errorMessage: string, alertCtl: AlertController) {
    const alert = alertCtl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}