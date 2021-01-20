import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs-compat/add/operator/timeout';
import 'rxjs-compat/add/operator/map';
import { Storage } from '@ionic/storage';
import { ProviderService } from './provider.service';

@Injectable({
  providedIn: 'root'
})
export class DbopsService {

  server:string = "https://www.nigairspacedata.com/api/"

  constructor(private http: HttpClient, private storage:Storage) { }
  token
   postData(token,body,file){
    let headers = new HttpHeaders({
      'content-type' : 'application/json; charset=UTF-8',
      'Authorization': token,
    });
    let options = {
      headers : headers,
    }
     return  this.http.post(this.server+file, JSON.stringify(body),options).map(res=>res)
    
  }
  async getData(file){
    this.token = await this.storage.get('access_token')
    console.log('token' + this.token )
    let headers = new HttpHeaders({
      'content-type' : 'application/json; charset=UTF-8',
      'Authorization': 'this.token'
    });
    let options = {
      headers : headers
    }
    let httpRequest = await this.http.get<any>(this.server+file,options).toPromise()
    return httpRequest
  }
  register(body,file){
    let headers = new HttpHeaders({
      'content-type' : 'application/json; charset=UTF-8',
    });
    let options = {
      headers : headers,
    }
     return  this.http.post(this.server+file, JSON.stringify(body),options).map(res=>res)
    
  }
}
