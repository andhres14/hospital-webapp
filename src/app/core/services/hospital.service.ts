import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HospitalInterface } from '../../shared/interfaces/hospital.interface';


const { base_url } = environment;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  getHospitals() {
    const url = `${ base_url }/hospitals`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: HospitalInterface) => resp.hospitals)
      );
  }

  createHospital(name: string) {
    const url = `${ base_url }/hospitals`;
    return this.http.post(url, { name }, this.headers);
  }

  updateHospital(id: string, name: string) {
    const url = `${ base_url }/hospitals/${ id }`;
    return this.http.put(url, { name }, this.headers);
  }

  deleteHospital(id: string) {
    const url = `${ base_url }/hospitals/${ id }`;
    return this.http.delete(url, this.headers);
  }
}
