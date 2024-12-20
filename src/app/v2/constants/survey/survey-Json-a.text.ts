export const surveyJsonA = {
  title:
    'PARTE A - ANTECEDENTES GENERALES DE LA EMPRESA PROVEEDORA DE SOLUCIONES DE I4.0 Y MA',
  description: 'Complete las siguientes preguntas',
  pages: [
    {
      name: 'INFORMACIÓN GENERAL DE LA EMPRESA',
      elements: [
        {
          name: '¿Cuál es el nombre de la empresa?',
          type: 'text',
          isRequired: true,
        },
        {
          name: '¿Cuál es la página web de su empresa?',
          type: 'text',
        },
        {
          name: '¿Cuáles son los teléfonos de contacto de su empresa?',
          type: 'text',
        },
        {
          name: 'Indíquenos un correo electrónico de contacto de su empresa',
          type: 'text',
          inputType: 'email',
        },
      ],
    },
    {
      name: 'INFORMACIÓN DE CARACTERIZACIÓN DE LA EMPRESA',
      elements: [
        {
          name: 'Indíquenos su nombre completo',
          type: 'text',
          isRequired: true,
        },
        {
          name: 'Indíquenos su correo electrónico',
          type: 'text',
          inputType: 'email',
        },
        {
          name: 'Indíquenos su teléfono de contacto',
          type: 'text',
        },
        {
          name: 'Indíquenos su área de trabajo en la empresa',
          type: 'text',
        },
      ],
    },
    {
      name: 'INFORMACIÓN DE LA EMPRESA',
      elements: [
        {
          name: 'Su empresa es:',
          type: 'radiogroup',
          choices: [
            'Una empresa chilena localizada en la región de Los Lagos exclusivamente',
            'Una empresa chilena localizada en la región de Los Lagos y también en otras regiones',
            'Una empresa chilena no localizada en región de Los Lagos',
            'Una empresa internacional con oficina en Chile',
            'Una empresa internacional con distribuidor en Chile',
            'Otra',
          ],
          isRequired: true,
        },
      ],
    },
    {
      name: '¿A QUÉ SECTORES ATIENDE PRINCIPALMENTE LA EMPRESA EN LA REGIÓN DE LOS LAGOS?',
      elements: [
        {
          name: 'Sectores',
          type: 'checkbox',
          choices: [
            'Sector Acuicultura',
            'Sector Alimentos (plantas de carne, leche, quesos o salmones, etc.)',
            'Sector Construcción',
            'Sector Manufactura (Maestranzas y otras similares)',
            'Sector Marítimo-Naviero-Portuario (Astilleros)',
            'Sector Turismo',
            'Sector Minero',
            'Sector Forestal',
            'Sector Industrial',
            'Otro sector',
          ],
          isRequired: true,
        },
      ],
    },
    {
      name: 'Experiencia',
      elements: [
        {
          name: '¿CUÁNTOS AÑOS DE EXPERIENCIA TIENE SU EMPRESA PROPORCIONANDO SOLUCIONES TECNOLÓGICAS?',
          type: 'radiogroup',
          choices: [
            'Hasta 3 años',
            'Entre 4 y 6 años',
            'Entre 7 y 10 años',
            'Más de 10 años',
          ],
          isRequired: true,
        },
      ],
    },
    {
      name: 'Tamaño Empresa',
      elements: [
        {
          name: '¿CUÁNTOS TRABAJADORES TIENE SU EMPRESA?',
          type: 'radiogroup',
          choices: [
            'Hasta 10 trabajadores',
            'Más de 10 y hasta 25 trabajadores',
            'Más de 25 y hasta 50 trabajadores',
            'Más de 50 y hasta 100 trabajadores',
            'Más de 100 trabajadores',
          ],
          isRequired: true,
        },
      ],
    },
    {
      name: 'Tecnologías I4.0',
      elements: [
        {
          name: '¿CUÁL DE LAS SIGUIENTES TECNOLOGÍAS SON PARTE DE LAS SOLUCIONES QUE LA EMPRESA OFRECE AL MERCADO?',
          type: 'checkbox',
          choices: [
            'Internet de las cosas (IoT)',
            'Tecnología 5G',
            'Robótica Colaborativa',
            'Simulación',
            'Cloud Computing',
            'Gemelos Digitales',
            'Inteligencia Artificial',
            'Realidad Aumentada',
            'Impresión 3D',
            'Realidad Virtual',
            'Diseño 3D',
            'Ciberseguridad',
            'Big Data',
            'Otra',
          ],
        },
      ],
    },
  ],
};
