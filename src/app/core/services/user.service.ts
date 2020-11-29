import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<User> {

  // enitityEndPoint = `${environment.apiUrl}/activities`;
  // private static enitityEndPoint = `users`;


    // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject
  //   because it has the write rights
  // - Writing to state should be handled by specialized User methods (ex: addUser, removeUser, etc)
  // - Create one BehaviorSubject per store entity, for example if you have UserGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _user = new BehaviorSubject<User[]>([]);
 // Expose the observable$ part of the _user subject (read only stream)
  readonly users$ = this._user.asObservable();

  // ********************* getter *********************
  // the getter will return the last value emitted in _user subject
  public get users(): User[] {
    return this._user.getValue();
  }

  // ********************* setter *********************
  // assigning a value to this._user will push it onto the observable
  // and down to all of its subsribers (ex: this._user = [])
  private set setUsers(val: User[]) {
    this._user.next(val);
  }

  constructor(enitityEndPoint = 'users', http: HttpClient) {
    super(enitityEndPoint , http);
  }


  getItems(params = {}) {

     return  super.get(params).pipe(
        map((res) => {
        let data: User[] =  res.data;
        console.log("ActivityService -> getItems -> res", res)
          // may be return with pagiantion or without pagination
        return data;
        }),
        tap(data => {
          this.setUsers = [...data];
        })
      );
    }

  postItem(editMode, model, id?: any, options? : any) {
    if (!editMode) {
      console.log('its hit for add');
      return super.post(model, {}).pipe(
        map((res: User) => {
        return res;
        }),
        tap(data => {
          // we assaign a new copy of user by adding a new todo to it
          this.setUsers = [...this.users , data];

        })
        // catchError((errorRes) => {
        //   return throwError(errorRes);
        // })
      );
    } else {
      console.log('its hit for edit');
      return super.patch(model, id, options).pipe(
        map((res: any) => {
        return res;
        }),
        tap(data => {
          let index  = this.users.findIndex(c => c.id == data.id)
          this.users[index] = data;
          this.setUsers = [...this.users];


        })
      );
    }
  }


  deleteItem(id) {
    return super.delete(id).pipe(
      map((res: any) => {
      return res;
      }),
      tap(data => {
        this.setUsers = this.users.filter(c => c.id != id);
      })
    );
  }

}
