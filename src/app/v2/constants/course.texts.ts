import { Breadcrumb } from '@shared/models/breadcrumb.model';
export const TIPS: string[] = [
  '¿Sabías que puedes buscar cursos por "online" o "presencial"?',
  'Prueba buscar "gestión de proyectos" para encontrar cursos relacionados.',
  'Puedes combinar palabras clave para refinar tus resultados, por ejemplo, "calidad alimentaria".',
  'Agrega "gratuito" al final de tu búsqueda para encontrar cursos sin costo, por ejemplo, "seguridad alimentaria gratuito".',
];

export const CUSTOM_MESSAGES: string[] = [
  '¡Espero que encuentres el curso que buscas!',
  '¡Buena suerte en tu aprendizaje!',
  '¡Éxito en tu búsqueda de formación!',
  '¡Que encuentres cursos interesantes!',
  '¡Que la educación te acompañe!',
  '¡Que tengas un excelente descubrimiento de cursos!',
];

export const SEARCH_KEYWORDS: string[] = [
  'online',
  'presencial',
  'gratuito',
  'de pago',
  'ingles',
];

export const BREADCRUMBS: Breadcrumb[] = [
  {
    label: 'Inicio',
    url: '/',
    icon: 'M10 2L2 7h3v7h4v-5h2v5h4V7h3L10 2z', // Ruta del icono SVG
  },
  {
    label: 'Buscadores',
    url: '/buscadores',
  },
  {
    label: 'Cursos',
    url: '/buscadores/cursos',
    isActive: true, // Indica que es la página actual
  },
];
