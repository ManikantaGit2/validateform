import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Services {
  constructor(public http:HttpClient) { }

   postUSer(data:any):Observable<any>{
    return this.http.post('http://localhost:3000/Details',data);
  }

  getUserdata():Observable<any>{
    return this.http.get('http://localhost:3000/Details');
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`http://localhost:3000/Details/${id}`)
  }
}
