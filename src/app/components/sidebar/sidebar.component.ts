import { Component, Inject, Input } from '@angular/core';
import { navigation } from '../../constants';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  navigation = navigation;
  @Input() sideBarOpen: boolean = true;

  logout() {
    alert('Take care, until next time!');
  }
}
