import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

const { base_url } = environment;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'users' | 'medics' | 'hospitals'): string {
    if (!img) {
      return `${ base_url }/uploads/users/no-img.jpg`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${ base_url }/uploads/${ type }/${ img }`;
    } else {
      return `${ base_url }/uploads/users/no-img.jpg`;
    }
  }

}
