import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { User } from '../../../types';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-content',
  imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatSortModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit{
  users: User[] = [];
  private usersSub!: Subscription;
  
  ngOnInit(): void {
    this.getUsersList();

    this.usersSub = this._userService.getUsersUpdateListener()
      .subscribe(users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  pageSize: number = 10;
  displayedColumns: string[] = ['firstName', 'lastName', 'createdAt', 'tags', 'email', 'description', 'action'
  ];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _userService: UserServiceService, private _dialog: MatDialog) {}

  getUsersList() {
    this._userService.getUsers().subscribe({
      next: (users) => {
          this._userService.setUsers(users);
      },
      error: (err) => console.error(err)
    })
  }
  ngOnDestroy() {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

  deleteUser(createdAt: string) {
    const updatedUsers = this._userService.deleteUser(createdAt);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
