import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "src/app/models/usuario.model";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { FirebaseService } from "src/app/services/firebase.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = {
    email: "",
    password: ""
  };
  form: FormGroup;
  hayError = false;

  constructor(
    // tslint:disable-next-line:variable-name
    private _firebase: FirebaseService,
    // tslint:disable-next-line:variable-name
    private _router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')]),
      password1: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  ngSubmitLogIn() {
    console.log('HOLA');
    this.hayError = false;
    this._firebase.logIn(this.usuario).then((res) => {
      this._router.navigate(['/privado']);
    }).catch((err) => {
      console.log(err);
      this.hayError = true;
    });
  }

  onClickGoogleLogin() {
    this._firebase.loginGoogle().then((res) => {
      this._router.navigate(['/privado']);
    }).catch(err => console.log(err));
  }
}
