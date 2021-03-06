import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable()
export class MessageService{
        public url: string;

        constructor(private _http: HttpClient){
            this.url = GLOBAL.url;
        }

        addMessage(token, message) : Observable<any>{
            let params = JSON.stringify(message);
            let headers = new HttpHeaders().set('Content-Type','application/json')
                                           .set('Authorization', token);
            return this._http.post(this.url+'message', params, {headers: headers});
        }

        getMyMessages(token, page=1): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type','application/json')
                                           .set('Authorization', token);
            return this._http.get(this.url+'my-messages/'+page, {headers: headers});
        }

        getEmittMessages(token, page=1): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type','application/json')
                                           .set('Authorization', token);
            return this._http.get(this.url+'messages/'+page, {headers: headers});
        }

        deleteMessage(id): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type','application/json');

            return this._http.delete(this.url+'delete-message/'+id, {headers: headers});
        }


}
