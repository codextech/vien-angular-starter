import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-response/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class ApiService<T> {
  constructor(private _url: string, private _http: HttpClient) {
    this._url = `${environment.apiUrl}/${this._url}`
  }

  get(params):  Observable<ApiResponse<T[]>> {
    return this._http.get<ApiResponse<T[]>>(this._url,  {params : params});
  }

  getOne(id: number):  Observable<ApiResponse<T>> {
    return this._http.get<ApiResponse<T>>(this._url);
  }

  post(model, options?: any) {
      return this._http.post(model, options);
  }

  delete(id) {
    return this._http.delete(`${this._url}/${id}`);
  }

  put(model , id? :any, options? : any) {
    return this._http.put(`${this._url}/${id}`,model, options);
  }

  patch(model, id?: any, options?: any) {
    return this._http.patch(`${this._url}/${id}`, model, options);
  }
}
