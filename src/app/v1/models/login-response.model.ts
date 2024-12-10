import { Usuario } from "@shared/models";

export interface LoginResponse {
    message: string;
    usuario: Usuario;
    token: string;
  }