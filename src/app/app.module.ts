import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Componentes
import { AppComponent } from './app.component';
import { VideojuegosComponent} from './videojuegos/videojuegos.component';
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    VideojuegosComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [], //Servicios
  bootstrap: [AppComponent]
})
export class AppModule { }
