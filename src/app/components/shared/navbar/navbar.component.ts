import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;

  constructor(
    // tslint:disable-next-line:variable-name
    private _firebase: FirebaseService,
    // tslint:disable-next-line:variable-name
    private _auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this._auth.auth.onAuthStateChanged(user => {
      if (user) {
        this.isLogin = true;
        this.nombreUsuario = user.displayName;
        this.emailUsuario = user.email;
      } else {
        this.isLogin = false;
      }
    });
  }

  logOut() {
    this._firebase.logOut();
  }
}
