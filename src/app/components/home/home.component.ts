//Importe basico para crear un componente
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit{
    public title:string;
    public carouselImage1:string;
    public carouselImage2:string;
    public carouselImage3:string;

    constructor(){
        this.title= 'Bienvenido a la Red Social'
        this.carouselImage1='/assets/images/france.jpg'
        this.carouselImage2='/assets/images/Norway.jpg'
        this.carouselImage3='/assets/images/switzerland.jpg'
    }

    ngOnInit(){
        console.log('Hola desde la home');
    }

}
