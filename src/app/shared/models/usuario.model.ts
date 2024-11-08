import { Role } from "@shared/enums";
import { Empresa } from "@shared/models";

export type Industria = Empresa;
export type Proveedor = Empresa;

// En caso de diferentes tipos de datos de empresas
//export interface Industria extends Empresa {};
//export interface Proveedor extends Empresa {};

export interface Usuario {
    idUsuario: number;
    nombre: string;
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
    nombreEmpresa: string | null;
    nombreProveedor: string | null;
    encuestaRealizada: boolean | null;
    nivelEncuesta: number | null;
  }