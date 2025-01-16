import { Component } from '@angular/core';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  imports: [AddEditFormComponent, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private _dialog: MatDialog) {}

  openAddEditForm() {
    this._dialog.open(AddEditFormComponent)
  }

}
