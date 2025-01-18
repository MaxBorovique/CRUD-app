import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserAddEditComponent } from '../user-add-edit/user-add-edit.component';


@Component({
  selector: 'app-header',
  imports: [MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() sideBarToggle!: () => void;
  constructor(
    private dialog: MatDialog,
  ) {}
  openAddEditForm() {
    
    const dialogRef = this.dialog.open(UserAddEditComponent);
  }

  toggleSidebar() {
    this.sideBarToggle();
  }
}
