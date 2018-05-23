//Importe basico para crear un componente
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MouseEvent } from '@agm/core';
//Modelos
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { Travels } from '../../models/travels';
//Servicios
import { UploadService } from '../../services/upload.service';
import { UserService } from '../../services/user.service';
import { TravelService } from '../../services/travels.service';
import { GLOBAL } from '../../services/global';
import { FollowService } from '../../services/follow.service';

@Component({
    selector:'maps',
    templateUrl: './maps.component.html',
    providers: [UserService, FollowService,TravelService,UploadService]
})
export class MapsComponent implements OnInit{
    public title: string;
    public user : User;
    public status : string;
    public identity;
    public token;
    public url;
    public stats;
    public followed;
    public following;
    public markers: marker[];
    public markersViajes : marker[];
    public letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    //Coordenadas de Barcelona
    public lat: number = 41.524644;
    public lng: number = 2.2679873;
    public maximo = this.letras.length;
    public texto: string;
    // google maps zoom level
    public zoom: number = 8;


    constructor(
        private _route: ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _followService : FollowService,
        private _travelServuce : TravelService,
        private _uploadService : UploadService,
    ){
        this.title = 'Viajes' ;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.following = false;
        this.followed = false;
        this.markers = [];
    }

    ngOnInit(){
        console.log('Profile.component cargado correctamente');
    }


    onSubmit(){
        this.sendMarkers();
    }

    mapClicked($event: MouseEvent) {
        if(this.markers.length >= this.letras.length){
            alert("No se pueden poner mas marcadores");
        }else{
            this.texto =prompt("introduce");

            this.markers.push({
                lat: $event.coords.lat,
                lng: $event.coords.lng,
                label: this.letras[this.markers.length],
                texto: this.texto,
                draggable: true
            });
        }

    }




    //Por si el usuario quiere subir fotos
    public filesToUpload : Array<File>;
    fileChangeEvent(fileInput : any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }


    //Metodo para conseguir las marcas del usuario logeado

    sendMarkers(){

    }

    //Metodo para conseguir los viajes


    //Metodo para cambiar los markers actuales por las del viaje seleccionado

}


interface marker {
    lat: number;
    lng: number;
    label?: string;
    texto?: string;
    draggable: boolean;
}
