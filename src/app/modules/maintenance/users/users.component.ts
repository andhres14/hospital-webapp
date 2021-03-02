import { Component, OnDestroy, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user.service';
import { SearchService } from '../../../core/services/search.service';
import { ModalImageService } from '../../../core/services/modal-image.service';

import { User } from '../../../shared/models/user.model';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public fromPage: number;
  public loading: boolean;
  public imgSubs: Subscription;
  public wordToSearch: string;
  public currentUid: string;

  constructor(private userService: UserService,
              private searchService: SearchService,
              private modalImageService: ModalImageService) {
    this.fromPage = 0;
    this.wordToSearch = '';
    this.currentUid = userService.uid;
  }

  ngOnInit(): void {
    this.getUsers();

    this.imgSubs = this.modalImageService.imageUploaded
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        console.log(img);
        this.reloadUsersTable();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  getUsers(): void {
    this.loading = true;
    this.userService.getUsers(this.fromPage, (this.fromPage + 5))
      .subscribe(({ totalUsers, users }) => {
        this.totalUsers = totalUsers;
        this.users = users;
        this.usersTemp = users;
        this.loading = false;
      });
  }

  changePage(value: number): void {
    this.fromPage += value;
    if (this.fromPage < 0) {
      this.fromPage = 0;
    } else if (this.fromPage > this.totalUsers) {
      this.fromPage -= value;
    }
    this.getUsers();
  }

  search(term: string): void {
    if (term.length === 0) {
      this.users = this.usersTemp;
      return;
    }
    this.searchService.generalSearch('users', term)
      .subscribe((resp: User[]) => {
        this.users = resp;
      });
  }

  deleteUser(user: User): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(user);
        this.userService.deleteUser(user)
          .subscribe(resp => {
            Swal.fire(
              'Deleted!',
              'User deleted.',
              'success'
            );
            this.reloadUsersTable();
          });
      }
    });
  }

  changeRole(user: User): void {
    this.userService.updateUser(user)
      .subscribe(resp => console.log(resp));
  }

  reloadUsersTable(): void {
    if (this.wordToSearch.length > 0) {
      this.search(this.wordToSearch);
    } else {
      this.getUsers();
    }
  }

  openModal(user: User): void {
    this.modalImageService.openModal('users', user.uid, user.img);
  }

}
