import { Industria, Proveedor, Usuario } from "@shared/models";

export interface RegistroResponse {
    message: string;
    empresa: Industria;
    proveedor: Proveedor;
    usuario: Usuario;
}