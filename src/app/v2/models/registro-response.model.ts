import { Industria, Proveedor, Usuario } from '@v2/models';

export interface RegistroResponse {
  message: string;
  empresa: Industria;
  proveedor: Proveedor;
  usuario: Usuario;
}
