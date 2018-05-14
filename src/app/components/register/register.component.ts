//Importe basico para crear un componente
import {Component, OnInit} from '@angular/core';
//Imports para poder usar las rutas y el modelo usario
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector : 'register',
  templateUrl : './register.component.html'
})

export class RegisterComponent implements OnInit{
  public title : string;
  public user : User;

  constructor(
    private _route : ActivatedRoute,
    private _router : Router

  ){
    this.title = 'Registrate';
    this.user = new User("","","","","","","ROLE_USER","");  
  }

  ngOnInit(){
    console.log('Componente de register cargado...');
  }
}
