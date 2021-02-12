import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor() {
  }

  async updateImg(
    file: File,
    type: 'users' | 'medics' | 'hospitals',
    uid: string
  ) {
    try {
      const url = `${ base_url }/uploads/${ type }/${ uid }`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: localStorage.getItem('userToken') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if (data.success) {
        return data.fileName;
      } else {
        console.log(data.message);
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
