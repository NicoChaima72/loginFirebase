import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  public fotoUsuario: string;

  constructor(
    // tslint:disable-next-line:variable-name
    private _firebase: FirebaseService,
    // tslint:disable-next-line:variable-name
    private _router: Router
  ) {}

  ngOnInit() {
    this._firebase.getAuth().subscribe(user => {
      if (user) {
        this.isLogin = true;
        this.nombreUsuario = user.displayName;
        this.emailUsuario = user.email;
        this.fotoUsuario = user.photoURL;
        console.log(user);
      } else {
        this.isLogin = false;
      }
    });
  }

  logOut() {
    this._firebase.logOut();
    this._router.navigate(['/login']);
  }
}
