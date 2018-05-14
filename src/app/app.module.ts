import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders} from './app.routing'; //Enrutador
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


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
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ], //Servicios
  bootstrap: [AppComponent]
})
export class AppModule { }
