export const surveyJsonE = {
  title: 'PARTE E - CERTIFICACIONES Y ESTÁNDARES',
  description:
    'Complete las siguientes preguntas relacionadas con las certificaciones y estándares que cumple su empresa.',
  pages: [
    {
      name: 'CERTIFICACIONES Y ESTÁNDARES',
      elements: [
        {
          type: 'radiogroup',
          name: 'cumplenEstandares',
          title:
            '¿SUS SOLUCIONES CUMPLEN CON ESTÁNDARES INTERNACIONALES DE SEGURIDAD Y CALIDAD?',
          isRequired: true,
          choices: [
            { value: 'si', text: 'Sí' },
            { value: 'no', text: 'No' },
            {
              value: 'noEstandares',
              text: 'No hay estándares para las soluciones que nuestra empresa ofrece',
            },
          ],
        },
        {
          type: 'radiogroup',
          name: 'certificacionesEspecificas',
          title:
            '¿CUÉNTAN CON CERTIFICACIONES ESPECÍFICAS PARA TECNOLOGÍAS DE CIBERSEGURIDAD INDUSTRIAL O INTEROPERABILIDAD DE SISTEMAS?',
          isRequired: true,
          choices: [
            { value: 'si', text: 'Sí' },
            { value: 'no', text: 'No' },
            {
              value: 'noEstandares',
              text: 'No hay estándares para las soluciones que nuestra empresa ofrece',
            },
          ],
        },
      ],
    },
  ],
};
