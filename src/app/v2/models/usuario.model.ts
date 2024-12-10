import { Role } from '@v2/enums';
import { Industria, Proveedor } from '@v2/models';

export interface Usuario {
  idUsuario: number;
  nombreRepresentante: string;
  correo: string;
  rol_id: number;
  estado: string | null;
  limiteBusquedas: number | null;
  created_at: string | null;
  rol: {
    nombreRol: Role;
  };
  empresas: Industria[] | null;
  proveedores: Proveedor[] | null;
  rut: string | null;
  rutRepresentante?: string | null;
  nombreEmpresa?: string | null;
  nombreProveedor?: string | null;
  encuestaRealizada?: boolean | null;
  nivelEncuesta?: number | null;
}
