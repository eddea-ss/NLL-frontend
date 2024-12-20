export const surveyJsonB = {
  title: 'PARTE B - ANTECEDENTES DE SU OFERTA TECNOLÓGICA',
  description:
    'Complete las siguientes preguntas relacionadas con la oferta tecnológica de su empresa.',
  pages: [
    {
      name: 'OFERTA TECNOLÓGICA',
      elements: [
        {
          type: 'radiogroup',
          name: 'ofertaTecnologica',
          title:
            'SU EMPRESA OFRECE PRODUCTOS Y/O SERVICIOS TECNOLÓGICOS AVANZADOS',
          isRequired: true,
          choices: [
            { value: 'soloProductos', text: 'Ofrecemos sólo productos' },
            { value: 'soloServicios', text: 'Ofrecemos sólo servicios' },
            {
              value: 'productosServicios',
              text: 'Ofrecemos productos y servicios',
            },
          ],
        },
        {
          type: 'radiogroup',
          name: 'productosOferta',
          title:
            '(SI SU EMPRESA OFRECE PRODUCTOS) LOS PRODUCTOS QUE SU EMPRESA OFRECE SON:',
          isRequired: true,
          visibleIf:
            "{ofertaTecnologica} = 'soloProductos' or {ofertaTecnologica} = 'productosServicios'",
          choices: [
            {
              value: 'productosDesarrollados',
              text: 'Desarrollados integramente por su empresa con tecnologías disponibles en el mercado',
            },
            {
              value: 'integracionTerceros',
              text: 'Son mayoritariamente integraciones de productos de terceros',
            },
            {
              value: 'productosTerceros',
              text: 'Son principalmente productos de terceros y los comercializamos e instalamos',
            },
          ],
        },
        {
          type: 'radiogroup',
          name: 'serviciosOferta',
          title:
            '(SI SU EMPRESA OFRECE SERVICIOS) LOS SERVICIOS QUE SU EMPRESA OFRECE SON:',
          isRequired: true,
          visibleIf:
            "{ofertaTecnologica} = 'soloServicios' or {ofertaTecnologica} = 'productosServicios'",
          choices: [
            {
              value: 'serviciosDesarrollados',
              text: 'Desarrollados integramente por su empresa con tecnologías disponibles en el mercado',
            },
            {
              value: 'integracionServiciosTerceros',
              text: 'Son mayoritariamente integraciones de servicios de terceros',
            },
            {
              value: 'serviciosTerceros',
              text: 'Son principalmente servicios de terceros',
            },
          ],
        },
        {
          type: 'matrixdropdown',
          name: 'tecnologiasIndustria4',
          title:
            'DE LAS TECNOLOGÍAS DE INDUSTRIA 4.0, INDIQUE SI LO QUE COMERCIALIZA SON PRODUCTOS Y/O SERVICIOS O AMBOS',
          columns: [
            {
              name: 'tipoOferta',
              title: 'Tipo de Oferta',
              cellType: 'radiogroup',
              choices: [
                { value: 'producto', text: 'Producto' },
                { value: 'servicio', text: 'Servicio' },
                { value: 'ambos', text: 'Productos y Servicios' },
              ],
            },
          ],
          rows: [
            { value: 'iot', text: 'Internet de las cosas (IoT)' },
            { value: 'robotica', text: 'Robótica Colaborativa' },
            { value: 'cloudComputing', text: 'Cloud Computing' },
            {
              value: 'inteligenciaArtificial',
              text: 'Inteligencia Artificial',
            },
            { value: 'machineLearning', text: 'Machine Learning' },
            { value: 'impresion3D', text: 'Impresión 3D' },
            { value: 'diseno3D', text: 'Diseño 3D' },
            { value: 'bigData', text: 'Big Data' },
            { value: 'tecnologia5G', text: 'Tecnología 5G' },
            { value: 'simulacion', text: 'Simulación' },
            { value: 'gemelosDigitales', text: 'Gemelos Digitales' },
            { value: 'realidadAumentada', text: 'Realidad Aumentada' },
            { value: 'realidadVirtual', text: 'Realidad Virtual' },
            { value: 'ciberseguridad', text: 'Ciberseguridad' },
            {
              value: 'analiticaDatosIndustriales',
              text: 'Análisis de Datos Industriales',
            },
            {
              value: 'mantenimientoPredictivo',
              text: 'Mantenimiento Predictivo',
            },
            {
              value: 'procesamientoVisionArtificial',
              text: 'Procesamiento de imágenes con visión artificial',
            },
            {
              value: 'simulacionProcesos',
              text: 'Simulación de Procesos y Operaciones',
            },
            { value: 'otra', text: 'Otra: (indicar)' },
          ],
          cellType: 'radiogroup',
          cellRequired: true,
        },
        {
          type: 'radiogroup',
          name: 'integracionTecnologias',
          title:
            '¿CÓMO INTEGRAN LAS DIFERENTES TECNOLOGÍAS PARA OFRECER SOLUCIONES INTEGRALES DE INDUSTRIA 4.0?',
          isRequired: true,
          choices: [
            {
              value: 'plataformaPropia',
              text: 'Plataforma propia de integración de datos y sistemas',
            },
            {
              value: 'solucionesPersonalizadas',
              text: 'Desarrollo de soluciones personalizadas de integración',
            },
            {
              value: 'apisAbiertas',
              text: 'Utilización de APIs abiertas para la interoperabilidad con sistemas existentes',
            },
            {
              value: 'colaboracionPartners',
              text: 'Colaboración con partners especializados en integración de sistemas',
            },
            {
              value: 'microservicios',
              text: 'Implementación de arquitecturas de microservicios para mayor flexibilidad',
            },
            { value: 'otras', text: 'Otras (especificar)' },
          ],
        },
        {
          type: 'radiogroup',
          name: 'adaptacionSoluciones',
          title:
            '¿ADAPTAN SUS SOLUCIONES A LAS NECESIDADES ESPECÍFICAS DE CADA SECTOR O CUENTAN CON PAQUETES PREDEFINIDOS?',
          isRequired: true,
          choices: [
            {
              value: 'adaptamos',
              text: 'Adaptamos las soluciones a las necesidades específicas',
            },
            {
              value: 'paquetesPredefinidos',
              text: 'Contamos con paquetes predefinidos',
            },
            {
              value: 'adaptamosYPaquetes',
              text: 'Adaptamos y contamos con paquetes predefinidos',
            },
          ],
        },
        {
          type: 'radiogroup',
          name: 'clientesImplementacion',
          title:
            '¿EN CUÁNTOS CLIENTES TIENE IMPLEMENTADAS SOLICIONES TECNOLÓGICAS AVANZADAS DE I4.0 y/o MA?',
          isRequired: true,
          choices: [
            { value: 'menos5', text: 'Menos de 5' },
            { value: 'entre5y10', text: 'Entre 5 y 10' },
            { value: 'entre11y20', text: 'Entre 11 y 20' },
            { value: 'mas20', text: 'Más de 20' },
          ],
        },
        {
          type: 'radiogroup',
          name: 'casosExitoCompartir',
          title:
            'SU EMPRESA TIENE CASOS DE ÉXITO QUE PUEDA COMPARTIR, CUANDO SEA CONTACTADO POR EMPRESAS DE LA REGIÓN DE LOS LAGOS',
          isRequired: true,
          choices: [
            {
              value: 'si',
              text: 'Sí, tenemos casos de éxito que podemos compartir',
            },
            { value: 'no', text: 'No tenemos casos de éxito para compartir' },
            {
              value: 'elaborando',
              text: 'Estamos elaborando casos de éxito y estarán próximamente disponibles',
            },
          ],
        },
        {
          type: 'checkbox',
          name: 'sectoresImplementacion',
          title:
            'EN QUÉ SECTORES INDUSTRIALES SU EMPRESA TIENE IMPLEMENTADAS LA MAYOR CANTIDAD DE SOLUCIONES DE INDUSTRIA 4.0 y/o MANUFACTURA AVANZADA',
          isRequired: true,
          choices: [
            { value: 'acuicultura', text: 'Sector Acuicultura' },
            {
              value: 'alimentos',
              text: 'Sector Alimentos (plantas de carne, leche, quesos o salmones, etc.)',
            },
            { value: 'construccion', text: 'Sector Construcción' },
            {
              value: 'manufactura',
              text: 'Sector Manufactura (Maestranzas y otras similares)',
            },
            {
              value: 'maritimoNavieroPortuario',
              text: 'Sector Marítimo-Naviero-Portuario (Astilleros)',
            },
            { value: 'turismo', text: 'Sector Turismo' },
            { value: 'minero', text: 'Sector Minero' },
            { value: 'forestal', text: 'Sector Forestal' },
            { value: 'industrial', text: 'Sector Industrial' },
            { value: 'otro', text: 'Otro sector' },
          ],
        },
      ],
    },
    {
      name: 'CASOS DE ÉXITO Y/O PROYECTOS DESTACADOS',
      elements: [
        {
          type: 'radiogroup',
          name: 'compartirCasosExito',
          title:
            '¿PODRÍAN COMPARTIR CON EMPRESAS CASOS DE ÉXITO DONDE SUS SOLUCIONES HAYAN GENERADO UN IMPACTO SIGNIFICATIVO EN LA PRODUCTIVIDAD, EFICIENCIA O REDUCCIÓN DE COSTOS?',
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
            '¿DÓNDE SE LOCALIZAN ESOS CLIENTES, QUE PODRÍAN VISITARSE? (DEPENDIENTE DE LA ANTERIOR)',
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
    {
      name: 'EFICIENCIA Y OPTIMIZACIÓN',
      elements: [
        {
          type: 'radiogroup',
          name: 'herramientasMonitorizacion',
          title:
            '¿OFRECEN HERRAMIENTAS PARA EL MONITOREO Y LA OPTIMIZACIÓN DE LOS PROCESOS INDUSTRIALES?',
          isRequired: true,
          choices: [
            { value: 'si', text: 'Sí' },
            { value: 'no', text: 'No' },
          ],
        },
        {
          type: 'radiogroup',
          name: 'optimizarGestionRecursos',
          title:
            '¿SUS SOLUCIONES AYUDAN A OPTIMIZAR LA GESTIÓN DE RECURSOS Y LA REDUCCIÓN DE DESPERDICIOS?',
          isRequired: true,
          choices: [
            { value: 'si', text: 'Sí' },
            { value: 'no', text: 'No' },
          ],
        },
      ],
    },
    {
      name: 'ÁMBITOS DE SOLUCIONES TECNOLÓGICAS',
      elements: [
        {
          type: 'comment',
          name: 'experienciaAutomatizacionRobotica',
          title:
            '¿CUÁL ES SU EXPERIENCIA CON LA AUTOMATIZACIÓN Y ROBÓTICA?. PROPORCIONE EJEMPLOS DE SUS SOLUCIONES',
          isRequired: true,
        },
        {
          type: 'comment',
          name: 'experienciaIAAprendizajeAutomatico',
          title:
            '¿TIENE EXPERIENCIA CON SISTEMAS DE INTELIGENCIA ARTIFICIAL Y APRENDIZAJE AUTOMÁTICO? PROPORCIONE EJEMPLOS DE SUS SOLUCIONES',
          isRequired: true,
        },
        {
          type: 'comment',
          name: 'experienciaAnaliticaDatos',
          title:
            '¿TIENE EXPERIENCIA EN ANALÍTICA DE DATOS? PROPORCIONE EJEMPLOS DE SUS SOLUCIONES',
          isRequired: true,
        },
      ],
    },
    {
      name: 'CALIDAD Y SEGURIDAD',
      elements: [
        {
          type: 'radiogroup',
          name: 'seguridadDatosPrivacidad',
          title:
            '¿CÓMO ASEGURA LA SEGURIDAD DE LOS DATOS Y LA PRIVACIDAD EN SUS PROYECTOS?',
          isRequired: true,
          choices: [
            {
              value: 'basica',
              text: 'Implementación básica: Uso de contraseñas y firewalls estándar',
            },
            {
              value: 'intermedia',
              text: 'Seguridad intermedia: Encriptación de datos en reposo y en tránsito, autenticación de dos factores',
            },
            {
              value: 'avanzada',
              text: 'Seguridad avanzada: Implementación completa de ISO 27001, monitoreo continuo, pruebas de penetración regulares',
            },
            {
              value: 'nivelEmpresarial',
              text: 'Seguridad de nivel empresarial: Todo lo anterior más uso de blockchain, tokenización de datos sensibles, y auditorías de seguridad por terceros',
            },
            {
              value: 'personalizado',
              text: 'Personalizado: Adaptamos nuestras medidas de seguridad a los requisitos específicos de cada cliente y sector',
            },
            {
              value: 'noAplicable',
              text: 'No aplicable: No manejamos datos sensibles o no ofrecemos servicios de seguridad',
            },
          ],
        },
      ],
    },
    {
      name: 'CAPACIDADES DE DESARROLLO Y PERSONALIZACIÓN',
      elements: [
        {
          type: 'radiogroup',
          name: 'adaptarSoluciones',
          title:
            '¿PUEDE SU EMPRESA ADAPTAR SUS SOLUCIONES TECNOLÓGICAS A LAS NECESIDADES ESPECÍFICAS DE UN CLIENTE?',
          isRequired: true,
          choices: [
            {
              value: 'noEstandarizadas',
              text: 'No, solo ofrecemos soluciones estandarizadas',
            },
            {
              value: 'personalizacionLimitada',
              text: 'Personalización limitada: Ajustes menores en la configuración de productos existentes',
            },
            {
              value: 'personalizacionModerada',
              text: 'Personalización moderada: Modificación de módulos existentes y desarrollo de nuevas funcionalidades sobre plataformas base',
            },
            {
              value: 'personalizacionAvanzada',
              text: 'Personalización avanzada: Desarrollo completo de soluciones a medida, incluyendo hardware y software',
            },
            {
              value: 'coCreacion',
              text: 'Co-creación: Trabajamos en estrecha colaboración con el cliente para diseñar y desarrollar soluciones totalmente personalizadas',
            },
          ],
        },
      ],
    },
    {
      name: 'INTEGRACIÓN DE SISTEMAS',
      elements: [
        {
          type: 'radiogroup',
          name: 'protocolosInteroperabilidad',
          title: '¿QUÉ PROTOCOLOS DE INTEROPERABILIDAD UTILIZA?',
          isRequired: true,
          choices: [
            {
              value: 'protocolosIndustriales',
              text: 'Protocolos industriales estándar (por ejemplo, Modbus, Profinet, EtherCAT)',
            },
            {
              value: 'protocolosIoT',
              text: 'Protocolos de IoT (por ejemplo, MQTT, CoAP, AMQP)',
            },
            { value: 'apisRESTful', text: 'APIs RESTful' },
            { value: 'serviciosWebSOAP', text: 'Servicios web SOAP' },
            {
              value: 'opcUA',
              text: 'OPC UA (Open Platform Communications Unified Architecture)',
            },
            {
              value: 'protocolosPropietarios',
              text: 'Protocolos propietarios desarrollados internamente',
            },
            { value: 'multiplesProtocolos', text: 'Múltiples protocolos' },
            {
              value: 'adaptable',
              text: 'Adaptable: Implementamos el protocolo requerido por el cliente o el entorno específico',
            },
          ],
        },
      ],
    },
    {
      name: 'GESTIÓN DE PROYECTOS',
      elements: [
        {
          type: 'radiogroup',
          name: 'metodologiasGestionProyectos',
          title:
            '¿QUÉ METODOLOGÍAS DE GESTIÓN DE PROYECTOS UTILIZA SU EMPRESA?',
          isRequired: true,
          choices: [
            { value: 'waterfall', text: 'Metodología en cascada (Waterfall)' },
            { value: 'agile', text: 'Agile (Scrum, Kanban, XP)' },
            { value: 'lean', text: 'Lean' },
            { value: 'sixSigma', text: 'Six Sigma' },
            { value: 'prince2', text: 'Prince2' },
            { value: 'pmiPMBOK', text: 'PMI/PMBOK' },
            {
              value: 'hybrido',
              text: 'Híbrido: combinación de metodologías ágiles y tradicionales',
            },
            {
              value: 'personalizada',
              text: 'Personalizada: Metodología propia adaptada a proyectos de i4.0',
            },
            {
              value: 'flexible',
              text: 'Flexible: adaptamos la metodología según los requisitos del proyecto y del cliente',
            },
          ],
        },
      ],
    },
  ],
};
