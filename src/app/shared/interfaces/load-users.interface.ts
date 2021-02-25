import { User } from '../models/user.model';

export interface LoadUsersInterface {
  totalUsers: number;
  users: User[];
}
