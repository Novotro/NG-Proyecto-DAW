import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';


@Injectable()
export class UserService{
    public url : string;
    public identity;
    public token;

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
    signup(user : any , gettoken = null ) : Observable<any>{

        if(gettoken != null){
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user); //Convertimos el usuario a JSON
        let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Defino las cabeceras HTTP

        return this._http.post(this.url+'login', params, {headers: headers});
    }


    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity')); //Convertir el archivo identity de LocalStorage a objeto JS
        if(identity != 'undefined'){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token'); //Convertir el archivo identity de LocalStorage a objeto JS
        if(token != 'undefined'){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }


}
