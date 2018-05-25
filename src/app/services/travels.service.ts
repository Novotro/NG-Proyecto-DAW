import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Travels } from '../models/travels';
import { GLOBAL } from './global';

@Injectable()
export class TravelService{
        public url: string;

        constructor(private _http: HttpClient){
            this.url = GLOBAL.url;
        }




        //Metodo para guardar los viajes de los usuarios
        addTravel(viaje: Travels) : Observable<any>{
            let params = JSON.stringify(viaje);
            let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Defino las cabeceras HTTP


            return this._http.post(this.url+'addTravel', params, {headers: headers});
        }

        //Metodo para conseguir los viajes de un usuario
        travelById(id) : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Defino las cabeceras HTTP
                    
            return this._http.get(this.url+'travelById/'+id, {headers: headers});
        }


        //Metodo para actualizr los Viajes
        updateTravel(viaje,id): Observable<any>{
            let params = JSON.stringify(viaje); //Convertimos el usuario a JSON
            let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Defino las cabeceras HTTP
            console.log(id);
            return this._http.put(this.url+'update-travel/'+id, params, {headers: headers});
        }


        //Metodo para conseguir todos los viajes
        travelList() : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Defino las cabeceras HTTP

            return this._http.get(this.url+'travelsList/false', {headers: headers});
        }

}
