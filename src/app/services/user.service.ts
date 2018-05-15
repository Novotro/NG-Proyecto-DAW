import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';


@Injectable()
export class UserService{
  public url : string;


  constructor( public _http: HttpClient){
    this.url = GLOBAL.url;
  }

  //Servicio de Registro de usuario
  register(user: User) : Observable<any>{
    let params = JSON.stringify(user); //Convertimos el usuario a JSON
    let headers = new HttpHeaders().set('Content-Type', 'application/json');


    return this._http.post(this.url+'register', params, {headers: headers}); // Solicitud al servidor de la API
  }

  //Servicio de logeo de usuario
  signup(user : User, gettoken= null) : Observable<any>{
      if(gettoken != null){
        user.gettoken = gettoken;
        this.status = 'success';
      }

      let params = JSON.stringify(user); //Convertimos el usuario a JSON
      let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Defino las cabeceras HTTP

      return this._http.post(this.url+'login', params, {headers: headers});
  }

}
