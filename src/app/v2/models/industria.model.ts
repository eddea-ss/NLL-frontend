import { Empresa } from "./empresa.model";

export interface Industria extends Empresa {
    idEmpresa: number;
    rut: string;
    eRut: string | null;
    proveedorActivado: boolean | null;
    nombreRepresentante: string;
    rutRepresentante: string;
    usuario_id: number;
    rol_id: number;
    estado: boolean | null;
    limiteBusquedas: number;
    created_at: Date | null;
};