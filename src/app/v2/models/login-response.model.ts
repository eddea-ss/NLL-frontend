import { Usuario } from '@v2/models';

export interface LoginResponse {
  message: string;
  usuario: Usuario;
  token: string;
}
