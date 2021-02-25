import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard!',
      icon: 'mdi mdi-gauge',
      childs: [
        { title: 'Main', url: '/' },
        { title: 'Promises', url: 'promises' },
        { title: 'RxJS', url: 'rxjs' },
      ]
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      childs: [
        { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Medics', url: 'medics' }
      ]
    }
  ];

  constructor() {
  }
}
