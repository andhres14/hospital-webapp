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
    if (this.img) {
      return !this.google ? `${ environment.base_url }/uploads/users/${ this.img }` : this.img;
    } else {
      return `${ environment.base_url }/uploads/no-img.jpg`;
    }
  }
}
