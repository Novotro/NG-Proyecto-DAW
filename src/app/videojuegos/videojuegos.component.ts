import {Component}  from '@angular/core';

@Component({
    selector : 'videojuegos',
    template : `
        <h2> Componente de {{nombre}}</h2>
        <h3 *ngIf="mostrar_retro != true">Mejor juego {{mejor_juego}}</h3>
        <h3 [style.background]="color" *ngIf="mostrar_retro">Mejor juego {{mejor_juego_retro}}</h3>
    `
})
//ngIf se usa como condicionador dentro de una etiqueta
//[style.background]="color"  <--- si se quiere poner directamente el color hay que  ponerlo con un string dentro con comillas simples [style.background]="'yellow'"

export class VideojuegosComponent{
  public nombre = 'videojuegos' ;
  public mejor_juego = 'Wakfu' ;
  public mejor_juego_retro = 'super mario 64' ;
  public mostrar_retro = true ;
  public color = 'yellow' ;
}
