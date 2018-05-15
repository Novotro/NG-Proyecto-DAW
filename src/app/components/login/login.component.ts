//Importe basico para crear un componente
import {Component, OnInit} from '@angular/core';
//Imports para poder usar las rutas y el modelo usario
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
    selector : 'login',
    templateUrl :'./login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit{
    public title: string;
    public user : User;
    public status : string;
    public identity; // Llevara un objeto del usuario identificado
    public token; // Llevara el token de autenticacion

    constructor(
        private _route : ActivatedRoute,
        private _router : Router,
        private _userService : UserService
    ){
        this.title = 'Identificate';
        this.user = new User("","","","","","","ROLE_USER","");
    }

    ngOnInit(){
    }

    onSubmit(){
        //Logear al usuario y conseguir sus datos
        this._userService.signup(this.user).subscribe(  //Recibir respuestas del backend
        response =>{
        this.identity= response.user;
        if(!this.identity || !this.identity._id){
            this.status= 'error';
        }else{
            this.status ='success';
            //Persistir datos del usuario

            //Conseguir token
            this.getToken();

        }
    },
    error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
            this.status = 'error';
        }
    }
);
}

getToken(){
    this._userService.signup(this.user, 'true').subscribe(  //Recibir respuestas del backend
        response =>{
        this.token= response.token;
        console.log(this.token);
        if(this.token.length <= 0){
            this.status= 'error';
        }else{
            this.status ='success';
            //Persistir token del usuario

            //Conseguir contadores o estadisticas


        }
    },
    error =>{
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
            this.status = 'error';
        }
    }
);
}


}
