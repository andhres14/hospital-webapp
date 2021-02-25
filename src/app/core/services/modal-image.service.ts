import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const { base_url } = environment;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private hideMdl: boolean;
  public typeImage: 'users' | 'hospitals' | 'medics';
  public id: string;
  public img: string;

  public imageUploaded: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.hideMdl = true;
  }

  get hideModal(): boolean {
    return this.hideMdl;
  }

  openModal(
    typeImage: 'users' | 'hospitals' | 'medics',
    id: string,
    img: string = 'x'
  ): void {
    this.hideMdl = false;
    this.typeImage = typeImage;
    this.id = id;
    this.img = img;
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${ base_url }/uploads/${ typeImage }/${ img }`;
    }
  }

  closeModal(): void {
    this.hideMdl = true;
  }

}
