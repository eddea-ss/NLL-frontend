import { Role } from "@shared/enums";
export interface RegistroCredentials {
    tipoUsuario: Role; // 'Persona', 'Empresa', 'Proveedor'
    correo: string;
    password: string;
    confirmPassword: string;
    // Campos comunes para Empresa y Proveedor
    nombreEmpresa?: string;
    nombreProveedor?: string;
    rut?: string;
    nombreRepresentante?: string;
    rutRepresentante?: string;
    estrategiaDigital?: number;
    desafiosIndustria4?: number;
    prioridadAdopcion?: number;
    // Campo específico para Persona
    nombre?: string;
    // Archivo ERUT
    eRut?: File;
}