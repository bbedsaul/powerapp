import firebase from 'firebase';
import {
  AngularFire, AngularFireDatabase, AuthMethods, AuthProviders, FirebaseListObservable
} from "angularfire2";
import {Injectable} from "@angular/core";
import {Company} from "../models/company";
import {User} from "../models/user";
import {environment} from "../../../../OneFreePlanet/onefreeplanet/src/environments/environment";

@Injectable()
export class AuthService {

  private companies: FirebaseListObservable<Company[]>;
  private users: FirebaseListObservable<User[]>;

  private currentUser: User = null;
  private currentCompany: Company = null;
  private signupApp;

  constructor(private firedb: AngularFireDatabase,
              private af: AngularFire) {

    this.companies = firedb.list('/companies');
    this.users = firedb.list('/registeredUsers');
    this.signupApp = firebase.initializeApp(environment.firebase, "Signup App");
  }

  /*
  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }

  sendForgotPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  */

  getCompanies() {
    return this.companies;
  }

  getUsers() {
    return this.users;
  }

  getEewpPath() {
    if (this.currentUser && this.currentCompany)
      return "/safety-adherence/" + this.currentCompany.name + "/" + this.currentUser.username + "/workpermit";
  }

  getEraPath() {
    if (this.currentUser && this.currentCompany)
      return "/safety-adherence/" + this.currentCompany.name + "/" + this.currentUser.username + "/riskassessment";
  }

  getAuditPath() {
    if (this.currentUser && this.currentCompany)
      return "/safety-adherence/" + this.currentCompany.name + "/" + this.currentUser.username + "/fieldaudit";
  }

  /*
   Get Current Company Details
   */
  getCurrentCompany(): Company {
    return this.currentCompany;
  }

  /*
   Get Current Users Details
   */
  getCurrentUser(): User {
    return this.currentUser;
  }

  /*
   Set Current Company Details
   */
  setCurrentCompany(currentcompany: Company) {
    this.currentCompany = currentcompany;
  }

  /*
   Set Current Users Details
   */
  setCurrentUser(currentuser: User) {
   this.currentUser = currentuser;
  }

  /*
   Get Current Users Details
   */
  getCurrentUserInfo(uid: string) {
    const retValue =  this.firedb.list('registeredUsers/', {
        query: {
          orderByKey: true,
          equalTo: uid
        }
      }
    );
    return retValue;
  }

  /*
   * Get Company from companyid
   */
  getCompanyInfo(companyid: string) {
    return this.firedb.list('companies/', {
        query: {
          orderByKey: true,
          equalTo: companyid
        }
      }
    );
  }

  getFormUrl(type:string):string {
    switch (type) {
      case 'AUDIT':
        return this.currentCompany.auditUrl;
      case 'LINE':
        return this.currentCompany.updateUrl;
      case 'ERA':
        return this.currentCompany.eraUrl;
      case 'EEWP':
        return this.currentCompany.eewpUrl;
    }
  }

  /**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
  registerUser(email, password) {
    return this.signupApp.auth().createUserWithEmailAndPassword(email, password);
  }
  /**
   * Updates information to display to screen when user is logged in
   * @param uid
   * @returns {firebase.Promise<void>}
   */
  updateUserInfo(uid, user: User) {
    return this.af.database.object('registeredUsers/' + uid).update({
      firstname: user.firstname,
      lastname: user.lastname,
      companyname: user.companyname,
      adminuser: user.adminuser,
    });
  }
  /**
   * Saves information to display to screen when user is logged in
   * @param uid
   * @param model
   * @returns {firebase.Promise<void>}
   */
  saveUserInfoFromForm(uid, user: User) {
    return this.af.database.object('registeredUsers/' + uid).set({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      companyname: user.companyname,
      adminuser: user.adminuser,
      emailaddress: user.emailaddress
    });
  }
  /**
   * Saves Company information
   * @returns {firebase.Promise<void>}
   */
  saveCompany(company: Company) {

    return this.af.database.object('companies/' + company.name).set({
      name: company.name,
      companyname: company.companyname,
      description: company.description,
      eewpUrl: company.eewpUrl,
      eraUrl: company.eraUrl,
      auditUrl: company.auditUrl,
      updateUrl: company.updateUrl
    });
  }
  /**
   * Logs the user in using their Email/Password combo
   * @param email
   * @param password
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  signin(email: string, password: string) {
    return this.af.auth.login({
        email: email,
        password: password,
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  logout() {
    // unsubscribe from lists.
    this.companies.remove();
    this.users.remove();

    this.af.auth.logout();
  }

  sendForgotPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
