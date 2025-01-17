import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { MainContentComponent } from "./components/main-content/main-content.component";
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.getUsersList();
  }
  title = 'crud-app';
  constructor(private _userService: UserServiceService) {}
  getUsersList() {
    this._userService.getUsers().subscribe({
      next: (res) => {
          console.log(res);
      },
      error: (err) => console.error(err)
    })
  }
}
