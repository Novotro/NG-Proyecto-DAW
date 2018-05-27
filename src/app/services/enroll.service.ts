import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enroll } from '../models/enroll';
import { GLOBAL } from './global';

@Injectable()
export class EnrollService{
    public url : string;

    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;

    }

    saveEnroll(token, enroll) : Observable<any>{
            let params = JSON.stringify(enroll);
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                           .set('Authorization', token);
            return this._http.post(this.url+'enroll', params ,{headers: headers});
    }

    deleteEnroll(token, enroll_id) : Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                           .set('Authorization', token);
            return this._http.delete(this.url+'deleteEnroll/'+enroll_id ,{headers: headers});
    }

}
