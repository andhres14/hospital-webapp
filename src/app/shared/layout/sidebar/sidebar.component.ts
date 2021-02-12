import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public user: User;
  constructor(private sidebarService: SidebarService,
              private userService: UserService) {
    this.menuItems = sidebarService.menu;
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

}
