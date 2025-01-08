import { User } from '@v2/models';

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}
