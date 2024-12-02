const PROYECTO = {
  label: 'Proyecto',
  url: '/',
};

const EVALUACIONES = {
  label: 'Evaluaciones',
  url: '/',
};

const INVESTIGACION = {
  label: 'Investigacion',
  url: '/',
};

//migas de pan
export const INICIO = [
  {
    label: 'Inicio',
    url: '/',
    icon: 'M10 2L2 7h3v7h4v-5h2v5h4V7h3L10 2z',
  },
];

export const PROYECTO_EQUIPO = [
  ...INICIO,
  PROYECTO,
  {
    label: 'Equipo',
    url: '/proyecto-equipo',
    isActive: true,
  },
];

export const PROYECTO_PLATAFORMA = [
  ...INICIO,
  PROYECTO,
  {
    label: 'Plataforma',
    url: '/proyecto-plataforma',
    isActive: true,
  },
];

export const EVALUACION_MADUREZ = [
  ...INICIO,
  EVALUACIONES,
  {
    label: 'Empresa',
    url: '/evaluaciones-madurez',
    isActive: true,
  },
];

export const EVALUACION_PROVEEDORES = [
  ...INICIO,
  EVALUACIONES,
  {
    label: 'Proveedor',
    url: '/evaluaciones-proveedor',
    isActive: true,
  },
];

export const EVALUACION_STARTUP = [
  ...INICIO,
  EVALUACIONES,
  {
    label: 'Startup',
    url: '/evaluaciones-startup',
    isActive: true,
  },
];

export const INVESTIGACION_INFORME = [
  ...INICIO,
  INVESTIGACION,
  {
    label: 'Diagnóstico',
    url: '/investigacion-diagnostico',
    isActive: true,
  },
];

export const INVESTIGACION_PODCASTS = [
  ...INICIO,
  INVESTIGACION,
  {
    label: 'Podcast',
    url: '/investigacion-Podcasts',
    isActive: true,
  },
];
