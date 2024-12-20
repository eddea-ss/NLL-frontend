export const surveyJsonD = {
  title: 'PARTE D - SERVICIOS ADICIONALES',
  description:
    'Complete las siguientes preguntas relacionadas con los servicios adicionales que ofrece su empresa.',
  pages: [
    {
      name: 'SERVICIOS ADICIONALES',
      elements: [
        {
          type: 'matrix',
          name: 'serviciosAdicionales',
          title:
            '¿ADEMÁS DE LA IMPLEMENTACIÓN DE SOLUCIONES TECNOLÓGICAS, OFRECEN SERVICIOS DE:...?',
          columns: [
            {
              value: 'si',
              text: 'Sí',
            },
            {
              value: 'no',
              text: 'No',
            },
          ],
          rows: [
            { value: 'consultoria', text: 'Consultoría' },
            { value: 'capacitacion', text: 'Capacitación' },
            {
              value: 'soporteTecnicoPresencial',
              text: 'Soporte Técnico Presencial',
            },
            {
              value: 'soporteTecnicoTelefonico',
              text: 'Soporte Técnico Telefónico',
            },
          ],
          isAllRowRequired: true,
          columnsVisibilityMode: 'required',
          rowCount: 4,
        },
        {
          type: 'radiogroup',
          name: 'programaFormacion',
          title:
            '¿CUENTAN CON UN PROGRAMA DE FORMACIÓN PARA CAPACITAR AL PERSONAL DE LAS EMPRESAS EN EL USO DE LAS NUEVAS TECNOLOGÍAS?',
          isRequired: true,
          choices: [
            {
              value: 'formacionOnline',
              text: 'Sí, contamos con formación online',
            },
            {
              value: 'formacionPresencialCliente',
              text: 'Sí, contamos con formación presencial en el cliente',
            },
            {
              value: 'formacionOnlinePresencial',
              text: 'Sí, contamos con formación online y presencial en el cliente',
            },
            {
              value: 'noFormacion',
              text: 'No contamos programas de formación',
            },
          ],
        },
        {
          type: 'checkbox',
          name: 'ciudadesSoporteTecnico',
          title: '¿EN QUÉ CIUDADES CUENTA CON SOPORTE TÉCNICO PRESENCIAL?',
          isRequired: true,
          visibleIf: "{programaFormacion} notcontains 'noFormacion'",
          choices: [
            { value: 'santiago', text: 'Santiago' },
            { value: 'valparaiso', text: 'Valparaíso' },
            { value: 'concepcion', text: 'Concepción' },
            { value: 'antofagasta', text: 'Antofagasta' },
            { value: 'temuco', text: 'Temuco' },
            { value: 'otra', text: 'Otra: (indicar)' },
          ],
          hasOther: true,
        },
        {
          type: 'radiogroup',
          name: 'procesoActualizaciones',
          title:
            '¿CUÁL ES EL PROCESO PARA MANEJAR LAS ACTUALIZACIONES DE SISTEMAS O TECNOLOGÍAS?',
          isRequired: true,
          choices: [
            {
              value: 'actualizacionesManual',
              text: 'Actualizaciones manuales a solicitud del cliente',
            },
            {
              value: 'actualizacionesPeriodicas',
              text: 'Actualizaciones programadas periódicas (especificar frecuencia: mensual, trimestral, etc.)',
            },
            {
              value: 'actualizacionesAutomaticas',
              text: 'Actualizaciones automáticas con opción de programación por el cliente',
            },
            {
              value: 'actualizacionContinuo',
              text: 'Proceso de actualización continua (CI/CD) con mínima interrupción del servicio',
            },
            {
              value: 'actualizacionesRemotas',
              text: 'Actualizaciones gestionadas remotamente por nuestro equipo de soporte',
            },
            {
              value: 'planActualizacionPersonalizado',
              text: 'Plan de actualización personalizado desarrollado en conjunto con cada cliente',
            },
          ],
        },
      ],
    },
  ],
};
