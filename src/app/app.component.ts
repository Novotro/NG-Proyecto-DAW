import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //Vista asociada
  styleUrls: ['./app.component.css'],  //Estilos asociados
  providers: [UserService]
})
export class AppComponent {
  public title:string;
  public identity;


  constructor(
      private _userService : UserService
  ){
      this.title  = 'Ruben Diaz WEBAPP ';
  }

  ngOnInit(){
      this.identity = this._userService.getIdentity();
      console.log(this.identity);
  }
}
