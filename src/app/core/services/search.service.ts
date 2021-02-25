import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadUsersInterface } from '../../shared/interfaces/load-users.interface';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';

const { base_url } = environment;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  get userToken(): string {
    return localStorage.getItem('userToken') || '';
  }

  get headers(): object {
    return {
      headers: {
        Authorization: this.userToken
      }
    };
  }

  private transformUsers(results: any[]): User[] {
    return results.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }

  generalSearch(
    typeSearch: 'users' | 'medics' | 'hospitals',
    wordSearch: string
  ) {
    const url = `${ base_url }/search/collection/${ typeSearch }/${ wordSearch }`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (typeSearch) {
            case 'users':
              return this.transformUsers(resp.results);
              break;
            case 'hospitals':
              break;
            case 'medics':
              break;
          }
        })
      );
  }
}
