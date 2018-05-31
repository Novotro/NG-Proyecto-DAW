//Importe basico para crear un componente
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MouseEvent } from '@agm/core';
//Jquery
import * as $ from 'jquery';
//Modelos
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { Travels } from '../../models/travels';
import { Enrolls } from '../../models/enroll';
//Servicios
import { UploadService } from '../../services/upload.service';
import { UserService } from '../../services/user.service';
import { TravelService } from '../../services/travels.service';
import { GLOBAL } from '../../services/global';
import { FollowService } from '../../services/follow.service';
import { EnrollService } from '../../services/enroll.service';

@Component({
    selector:'maps',
    templateUrl: './maps.component.html',
    providers: [UserService, FollowService,TravelService,UploadService,EnrollService]
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
    public params;
    //Viaje
    public travel : Travels;
    public travels : Travels[];
    public letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    //Coordenadas de Barcelona
    public lat: number = 41.524644;
    public lng: number = 2.2679873;
    public maximo = this.letras.length;
    public texto: string;
    // google maps zoom level
    public zoom: number = 10;
    //Enroll
    public enroll;
    public enrolleds;
    public enrolledsArray: Enrolls [];


    constructor(
        private _route: ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _followService : FollowService,
        private _travelService : TravelService,
        private _uploadService : UploadService,
        private _enrollService : EnrollService
    ){
        this.title = 'Viajes' ;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.following = false;
        this.followed = false;
        this.markers = [];
        this.travels = [];
        this.travel  = new Travels("","","","","",true,"",null,null);
        this.params = "";
        this.enroll = new Enrolls("",null);
        this.enrolleds = "";
    }



    ngOnInit(){
        console.log('Profile.component cargado correctamente');
        this.getTravels();
        this._route.params.subscribe(params =>{
            let travel_id = params['id'];
                if(params['id']){
                    this.params = travel_id;
                }
                console.log(this.params);
            });
            if(this.params!= '' && this.params != undefined && this.params != null){
                this.selectTravel();
            }
    }


    onSubmit(form){
        this.createTravel(form);
        form.reset();
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
            this.travel._id = response.travel._id;
            this.getTravels();
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

//Metodo para conseguir los viajes
getTravels(){
this._travelService.travelList().subscribe(
    response => {
        this.travels = response;
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


//Metodo para actualizar un viajes
updateTravels(){
this._travelService.updateTravel(this.travel,this.travel._id).subscribe(
    response => {
        console.log("Viaje actualizado");

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

//Metodo para cambiar el viaje por otro clicado

selectTravel(){
    this._travelService.travelById(this.params).subscribe(
        response => {
            this.travel = response.travel;
            this.markers = response.travel.markers;
            // this._router.navigate("/viajes/"+this.params);
            console.log(this.travel);
            // localStorage.clear();
            },
        error =>{
            var errorMessage = <any>error;
            console.log(errorMessage);
            if(errorMessage != null){
                this.status = 'error';
        }
    });
}



uploadImage(id){
    // this._travelService.uploadImage(this.filesToUpload, id).subscribe(
    //     response => {
    //         this.filesToUpload = [];
    //         this.ngOnInit();
    //         },
    //     error =>{
    //         var errorMessage = <any>error;
    //         console.log(errorMessage);
    //         if(errorMessage != null){
    //             this.status = 'error';
    //     }
    // });

    this._travelService.uploadImage(this.url+'upload-image-travel/'+id, [], this.filesToUpload, this.token, 'image')
                       .then((result:any)=>{
                           this.filesToUpload = [];
                           this.ngOnInit();
                       });
}


/* Enrolls */


//Guardar un enroll ( participar en el markersViajes)
saveEnroll(){
    this.enroll.user = this.identity;
    this.enroll.enrolled = this.travel;

    if(this.travel._id == ''){
        alert("No has seleccionado un viaje");

    }else{
        this._enrollService.saveEnroll(this.token,this.enroll).subscribe(
            response => {
                console.log("enroll Guardado!");
                this.enroll = response.enroll;
                // console.log(this.markers);
                // console.log(response);
            },
            error =>{
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
            }
        });
    }
}

//Listado de usuarios apuntados a un viaje
getEnrolledUsers(id){

    console.log("id del enroll: " + id);
        this._enrollService.getEnrolledUsers(this.token,id).subscribe(
            response => {
                console.log(response);
                this.enrolleds = response.enrolls;
                console.log("enrolleds: " + this.enrolleds);
            },
            error =>{
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
            }
        });


}


// Borrar un enroll
deleteEnroll(){
    this._enrollService.deleteEnroll(this.token, this.enroll._id).subscribe(
        response => {
            console.log("id Enroll!  "+ this.enroll._id);

            this.enroll = response.enroll;
        },
        error =>{
            var errorMessage = <any>error;
            console.log(errorMessage);
            if(errorMessage != null){
                this.status = 'error';
        }
    });
}


}



interface marker {
    lat: number;
    lng: number;
    label?: string;
    texto?: string;
    draggable: boolean;
    fotos?: File[];
}
