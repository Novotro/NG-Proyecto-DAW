import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Travels } from '../models/travels';
import { GLOBAL } from './global';

@Injectable()
export class TravelsService{
        public url: string;

        constructor(private _http: HttpClient){
            this.url = GLOBAL.url;
        }

        //Metodo para conseguir los viajes de los usuarios


        //Metodo para guardar los viajes de los usuarios


        //Metodo para actualizr los Viajes
        


}
