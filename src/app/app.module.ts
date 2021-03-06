import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders} from './app.routing'; //Enrutador
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; //Modulo para hacer peticiones ajax a una api
import { MomentModule } from 'angular2-moment';

import * as Observable from 'rxjs';

//Modulo de google maps
import { AgmCoreModule } from '@agm/core';


//Modulo custom
import { MessagesModule } from './messages/messages.module';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';
import { MapsComponent} from './components/maps/maps.component';


//Servicios
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    MomentModule,
    MessagesModule,
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyBBD-O0cX5KR21c03_5RFQpqTb4cHvgIAo'
   })
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserGuard
  ], //Servicios
  bootstrap: [AppComponent]
})
export class AppModule { }
