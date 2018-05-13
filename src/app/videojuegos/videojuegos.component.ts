import {Component}  from '@angular/core';

@Component({
    selector : 'videojuegos',
    template : `
        <h2> Componente de {{nombre}}</h2>
        <h3 *ngIf="mostrar_retro != true">Mejor juego {{mejor_juego}}</h3>
        <h3 [style.background]="color" *ngIf="mostrar_retro">Mejor juego {{mejor_juego_retro}}</h3>

        <h2> Listado de videojuegos</h2>
        <ul>
          <li *ngFor="let game of videojuegos">{{game}}</li>
        </ul>
    `
})
//ngIf se usa como condicionador dentro de una etiqueta
//[style.background]="color"  <--- si se quiere poner directamente el color hay que  ponerlo con un string dentro con comillas simples [style.background]="'yellow'"
//Para mostrar una posicion en concreto del array hay que hacerlo asi : {{videojuegos[2]}}

//PAra recorrer un array con ngFor hay que hacer la siguiente sintaxis <li *ngFor="let VARIABLE of ARRAY">{{VARIABLE}}</li>
export class VideojuegosComponent{
  public nombre = 'videojuegos' ;
  public mejor_juego = 'Wakfu' ;
  public mejor_juego_retro = 'super mario 64' ;
  public mostrar_retro = true ;
  public color = 'yellow' ;

  public videojuegos =[
    'Los simpsons hit and run',
    'Assassins creed',
    'GTA',
    'COD',
    'Tekken'
  ] ;
}
