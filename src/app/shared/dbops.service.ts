import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs-compat/add/operator/timeout';
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DbopsService {

  server:string = "http://www.nigairspacedata.com/api/"

  constructor(private http: HttpClient) { }

  postData(body,file){
    let headers = new HttpHeaders({
      'content-type' : 'application/json; charset=UTF-8'
    });
    let options = {
      headers : headers
    }
    return this.http.post(this.server+file, JSON.stringify(body))
    .timeout(59000)
    .map(res=>res)
  }


}
