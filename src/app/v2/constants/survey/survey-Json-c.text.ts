export const surveyJsonC = {
  title: 'PARTE C - CASOS DE ÉXITO Y PROYECTOS DESTACADOS',
  description:
    'Complete las siguientes preguntas relacionadas con casos de éxito y proyectos destacados de su empresa.',
  pages: [
    {
      name: 'CASOS DE ÉXITO Y PROYECTOS DESTACADOS',
      elements: [
        {
          type: 'radiogroup',
          name: 'compartirCasosExito',
          title:
            '¿PODRÍAN COMPARTIR CASOS DE ÉXITO DONDE SUS SOLUCIONES HAYAN GENERADO UN IMPACTO SIGNIFICATIVO EN LA PRODUCTIVIDAD, EFICIENCIA O REDUCCIÓN DE COSTOS?',
          isRequired: true,
          choices: [
            { value: 'si', text: 'Sí' },
            { value: 'no', text: 'No' },
          ],
        },
        {
          type: 'radiogroup',
          name: 'visitarClientesReferencia',
          title:
            '¿OFRECEN LA POSIBILIDAD DE VISITAR A CLIENTES DE REFERENCIA PARA CONOCER DE PRIMERA MANO LA IMPLEMENTACIÓN DE SUS SOLUCIONES?',
          isRequired: true,
          choices: [
            { value: 'si', text: 'Sí' },
            { value: 'no', text: 'No' },
          ],
        },
        {
          type: 'text',
          name: 'localizacionClientes',
          title:
            '¿DÓNDE SE LOCALIZAN ESOS CLIENTES? (DEPENDIENTE DE LA ANTERIOR)',
          isRequired: true,
          visibleIf: "{visitarClientesReferencia} = 'si'",
        },
        {
          type: 'radiogroup',
          name: 'reconocimientosPremios',
          title:
            '¿HAN RECIBIDO ALGÚN RECONOCIMIENTO O PREMIO POR SUS PROYECTOS DE INDUSTRIA 4.0?',
          isRequired: true,
          choices: [
            { value: 'si', text: 'Sí' },
            { value: 'no', text: 'No' },
          ],
        },
      ],
    },
  ],
};
