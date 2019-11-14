import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  usuario: UsuarioModel = {
    email: '',
    password: ''
  };
  form: FormGroup;
  hayError = false;
  emailExiste = false;

  constructor(
    // tslint:disable-next-line:variable-name
    private _firebase: FirebaseService,
    // tslint:disable-next-line:variable-name
    private _router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[^@]+@[^@]+\.[a-zA-Z]{2,}$')]),
      password1: new FormControl(),
      password2: new FormControl()
    });
    this.form.controls.password1.setValidators([
      Validators.required,
      Validators.minLength(8),
      this.noIgual.bind(this.form)
    ]);
    this.form.controls.password2.setValidators([
      Validators.required,
      this.noIgual.bind(this.form)
    ]);
  }

  ngOnInit() {
  }

  noIgual(control: FormControl): {[s: string]: boolean} {
    // tslint:disable-next-line:prefer-const
    let forma: any = this;
    if (control.value !== forma.controls.password1.value) {
      return {
        noIgual: true
      };
    }
    return null;
  }



  ngSubmitAddUser() {
    this.hayError = false;
    this.emailExiste = false;

    this._firebase.registerUser(this.usuario).then((res) => {
      this._router.navigate(['/privado']);
    }).catch((err) => {
      this.hayError = true;
      console.log(err.code);
      if (err.code === 'auth/email-already-in-use') {
        this.emailExiste = true;
      }
    });
  }

}
