import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    /*const promise = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hello world');
      } else {
        reject('error');
      }
    });
    promise.then((res) => {
      console.log(res);
    }).catch(error => console.log(error));
    console.log('Init');*/
    this.getUsers()
      .then(res => console.log(res));
  }

  getUsers(): Promise<any> {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users?page=2')
        .then(resp => resp.json())
        .then(body => console.log(body.data))
        .catch(error => console.log(error));
    });
  }

}
