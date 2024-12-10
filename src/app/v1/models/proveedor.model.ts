import { Empresa } from "./empresa.model";

export interface Proveedor extends Empresa {
    idEmpresa: number;
    rut: string;
    nombreProveedor: string | null;
    eRut: string | null;
    proveedorActivado: boolean | null;
    nombreRepresentante: string | null;
    rutRepresentante: string | null;
    usuario_id: number;
    rol_id: number;
    estado: boolean | null;
    limiteBusquedas: number;
    created_at: Date | null;
};