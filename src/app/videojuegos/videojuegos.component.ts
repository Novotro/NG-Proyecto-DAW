import {Component}  from '@angular/core';
//Los typings se hacen dentro de los componentes
declare var jQuery:any;
declare var $:any;


@Component({
    selector : 'videojuegos',
    templateUrl : './videojuegos.component.html'
})
//ngIf se usa como condicionador dentro de una etiqueta
//[style.background]="color"  <--- si se quiere poner directamente el color hay que  ponerlo con un string dentro con comillas simples [style.background]="'yellow'"
//Para mostrar una posicion en concreto del array hay que hacerlo asi : {{videojuegos[2]}}

//PAra recorrer un array con ngFor hay que hacer la siguiente sintaxis <li *ngFor="let VARIABLE of ARRAY">{{VARIABLE}}</li>

export class VideojuegosComponent{
  public nombre:string;
  public mejor_juego:string;
  public mejor_juego_retro:string;
  public mostrar_retro:boolean;
  public color:string;
  public year:number;
  public videojuegos:Array<any>;

  constructor(){
    this.nombre = 'videojuegos' ;
    this.mejor_juego = 'Wakfu' ;
    this.mejor_juego_retro  = 'super mario 64' ;
    this.mostrar_retro = true;
    this.color = 'yellow';
    this.year = 2018;

    this.videojuegos=[
      'Los simpsons hit and run',
      'Assassins creed',
      'GTA',
      'COD',
      'Tekken',
      232121
    ] ;

  }
}
