import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Dropbox {

  accessToken: any;
  folderHistory: any = [];
  headers: Headers;
  constructor(public http: Http) {

  }

  setAccessToken(token) {
    this.accessToken = token;
  }

  getFolders(path?){

    this.headers = this.getHeaders();
    console.log("dropbox path = " + JSON.stringify(path));
    return this.http.post('https://api.dropboxapi.com/2-beta-2/files/list_folder', JSON.stringify(path), {headers: this.headers})
      .map(res => res.json());

  }

  getFileUrl(path?){
    this.headers = this.getHeaders();

    console.log("dropbox path = " + JSON.stringify(path));
    return this.http.post('https://api.dropboxapi.com/2-beta-2/files/get_temporary_link', JSON.stringify(path), {headers: this.headers})
      .map(res => res.json());

  }

  getHeaders() {
    let headers = new Headers();

    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
