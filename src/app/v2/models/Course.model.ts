export interface Course {
  titulo: string;
  descripcion: string;
  link: string;
  entidad: string;
  plataforma: string;
  idioma: string;
  tipo: string; // 'de pago' o 'gratuito'
  modalidad: string; // 'online' o 'presencial'
  nivel: string;
  duracion: string;
  tipo_de_conocimiento: string[];
}
