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
    //Viaje
    public travel : Travels;
    public letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    //Coordenadas de Barcelona
    public lat: number = 41.524644;
    public lng: number = 2.2679873;
    public maximo = this.letras.length;
    public texto: string;
    // google maps zoom level
    public zoom: number = 10;


    constructor(
        private _route: ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _followService : FollowService,
        private _travelService : TravelService,
        private _uploadService : UploadService,
    ){
        this.title = 'Viajes' ;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.following = false;
        this.followed = false;
        this.markers = [];
        this.travel  = new Travels("","","","",true,"",null,null);
    }

    ngOnInit(){
        console.log('Profile.component cargado correctamente');
    }


    onSubmit(form){
        this.sendMarkers();
        this.createTravel(form);
    }

    //Borrar todos los marcadores
    clearMap(){
    this.markers= [];
}

//Borrar un marcador en concreto
deleteMarker(posicion){
this.markers.splice(posicion,1);
this.renameMarkers();
}

//Poner las letras en orden
renameMarkers(){
for(var i=0 ; i<= this.markers.length ; i++){
    this.markers[i].label = this.letras[i];
}
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

//Metodo para crear el viajes
createTravel(viaje){
if(this.markers.length <= 0){
    alert("tienes que introducir las marcas!");
}else{
    this.travel.country = "Barcelona";
    this.travel.organizer= this.identity._id;
    this.travel.galery = null;
    this.travel.markers = this.markers;
    console.log(this.travel);

    this._travelService.addTravel(this.travel).subscribe(
        response => {
            console.log("Viaje guardado");
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


//Por si el usuario quiere subir fotos
public filesToUpload : Array<File>;
fileChangeEvent(fileInput : any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
}

//Transformar las marcas de la vista en un Array
viewMarkers(marcas){
this.markersViajes = marcas;
console.log(this.markersViajes);
}


//Metodo para conseguir las marcas del usuario logeado

sendMarkers(){

}

//Metodo para conseguir los viajes


//Metodo para cambiar los markers actuales por las del viaje seleccionado

}

//Conenido del api travels
// name: String,
// country: String,
// organizer: {type: Schema.ObjectId, ref: 'User'},
// date: String,
// status: Boolean,
// description: String,
// galery: [String],
// markers: [any]


interface marker {
    lat: number;
    lng: number;
    label?: string;
    texto?: string;
    draggable: boolean;
    fotos?: File[];
}
