import {Component}  from '@angular/core';

@Component({
    selector : 'videojuegos',
    template : `
        <h2> Componente de {{nombre}}</h2>
        <h3>Mejor juego {{mejor_juego}}</h3>
    `
})

export class VideojuegosComponent{
  public nombre = 'videojuegos' ;
  public mejor_juego = 'Wakfu'
}
