import { environment } from '../../../environments/environment';

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
  ) {
  }

  get profileImage(): string {
    if (!this.img) {
      return `${ environment.base_url }/uploads/users/no-img.jpg`;
    } else if (this.img.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${ environment.base_url }/uploads/users/${ this.img }`;
    } else {
      return `${ environment.base_url }/uploads/users/no-img.jpg`;
    }
  }
}
