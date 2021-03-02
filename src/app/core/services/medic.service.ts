import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { MedicResponseGetByIdInterface, MedicResponseGetInterface } from '../../shared/interfaces/medic.interface';
import { Medic } from '../../shared/models/medic.model';

const { base_url } = environment;

@Injectable({
  providedIn: 'root'
})
export class MedicService {

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

  getMedics() {
    const url = `${ base_url }/medics`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: MedicResponseGetInterface) => resp.medics)
      );
  }

  getMedicById(id: string) {
    const url = `${ base_url }/medics/${ id }`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: MedicResponseGetByIdInterface) => resp.medic)
      );
  }

  createMedic(medic: { name: string, hospital: string }) {
    const url = `${ base_url }/medics`;
    return this.http.post(url, medic, this.headers);
  }

  updateMedic(medic: Medic) {
    const url = `${ base_url }/medics/${ medic._id }`;
    return this.http.put(url, medic, this.headers);
  }

  deleteMedic(id: string) {
    const url = `${ base_url }/medics/${ id }`;
    return this.http.delete(url, this.headers);
  }
}
