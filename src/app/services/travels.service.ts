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

        //Metodo para subir imagenes
        uploadImage(url: string, params: Array<string>, files : Array<File>, token : string, name : string){
            return new Promise(function(resolve, reject){
                var formData : any =new FormData();
                var xhr = new XMLHttpRequest(); //Objeto que nos permite hacer peticiones ajax en js puro

                for(var i = 0; i< files.length; i++){
                    formData.append(name, files[i], files[i].name);
                }
                xhr.onreadystatechange= function(){
                    if(xhr.readyState == 4){
                        if(xhr.status == 200){
                            resolve(JSON.parse(xhr.response));
                        }else{
                            reject(xhr.response);
                        }
                    }
                }

                xhr.open('POST', url, true);
                xhr.setRequestHeader('Authorization', token);
                xhr.send(formData);

            });
        }


        deleteTravel(id): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/json'); //Defino las cabeceras HTTP

            return this._http.delete(this.url+'delete-travel/'+id, {headers: headers});
        }

}
