import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private _httpClient: HttpClient) {}

  addUser(data: User): Observable<any> {
    return this._httpClient.post('/assets/data/users.json', data);
  }

  getUsers(): Observable<any> {
    return this._httpClient.get('/assets/data/users.json');
  }
}
