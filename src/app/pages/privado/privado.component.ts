import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-privado',
  templateUrl: './privado.component.html',
  styleUrls: ['./privado.component.css']
})
export class PrivadoComponent implements OnInit {

  usuario: object;

  constructor(
    // tslint:disable-next-line:variable-name
    public _firebase: FirebaseService
  ) { }

  ngOnInit() {
    this._firebase.getAuth().subscribe(user => {
      if (user) {
        this.usuario = user;
      }
    });
  }

}
