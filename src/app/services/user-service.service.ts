import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/assets/data/users.json');
  }

  getUsersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  setUsers(users: User[]) {
    this.users = users;
    this.usersUpdated.next([...this.users]);
  }

  addUser(data: User) {
    this.users.unshift(data);
    this.usersUpdated.next([...this.users]);
    return this.users;
  }

  getCurrentUsers(): User[] {
    return this.users;
  }

  deleteUser(createdAt: string): User[] {
    this.users = this.users.filter((user) => user.createdAt !== createdAt);
    this.usersUpdated.next([...this.users]);
    return this.users;
  }

  updateUser(createdAt: string, updatedData: User) {
    const index = this.users.findIndex((user) => user.createdAt === createdAt);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedData };
      this.usersUpdated.next([...this.users]);
    }
  }
}
