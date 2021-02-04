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
        { title: 'Main', url: '/' }
      ]
    }
  ];

  constructor() {
  }
}
