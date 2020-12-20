import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-response/api-response.model';
import { environment } from 'src/environments/environment';


export class ApiService<T>  {
  constructor(private _url: string,private _http: HttpClient) {
    this._url = `${environment.apiUrl}/api/${this._url}`
  }

  private endPoint (url) {
    return `${this._url}/${url}`;
  }


  get( url: string , params = {}):  Observable<ApiResponse<T[]>> {
    return this._http.get<ApiResponse<T[]>>(this.endPoint(url),  {params : params});
  }

  getOne(url:string , id: string = '' , params = {}):  Observable<ApiResponse<T>> {
    return this._http.get<ApiResponse<T>>(`${this.endPoint(url)}` , {params : params});
  }

  post( url: string ,model, options = {}) :  Observable<ApiResponse<T>> {
    return this._http.post<ApiResponse<T>>(this.endPoint(url) , model , options);
  }

  put( url: string , model , id? :any, options = {}) : Observable<ApiResponse<T>>  {
    return this._http.put<ApiResponse<T>>(`${this.endPoint(url)}`,model, options);
  }

  patch( url: string , model , options = {}) : Observable<ApiResponse<T>>  {
    return this._http.patch<ApiResponse<T>>(`${this.endPoint(url)}`,model, options);
  }


  delete(url: string ,id= '' , params={}) : Observable<ApiResponse<T>>  {
    return this._http.delete<ApiResponse<T>>(`${this.endPoint(url)}${id}` , {params : params});
  }

}
