import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';

export const DEFAULT_DATE_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-user-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent, 
    MatDialogActions, 
    MatDialogTitle, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.scss',
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UA' },
    { provide: MAT_DATE_FORMATS, useValue: DEFAULT_DATE_FORMATS }, 
  ],
})
export class UserAddEditComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<UserAddEditComponent>,
    private dateAdapter: DateAdapter<Date>,
    private _userService: UserServiceService,
  ) {

    this.userForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      createdAt: [new Date(), [Validators.required]],
      description: [''],
      tags: [''],
    });
  }

  ngOnInit() {
    this.dateAdapter.setLocale('uk');
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      const newUser = {
        ...this.userForm.value,
        createdAt: this.userForm.value.createdAt.toISOString(),
      }
      const updatedUsers = this._userService.addUser(newUser);
      this._dialogRef.close(updatedUsers);
    } else {
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onClose() {
    this._dialogRef.close();
  }
}