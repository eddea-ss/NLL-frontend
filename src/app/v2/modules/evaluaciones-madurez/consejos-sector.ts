/**
 * Definir consejos específicos por sector y rango de puntaje para la implementación de tecnologías de Industria 4.0
 */

export interface Consejo {
  titulo: string;
  descripcion: string;
}

export interface ConsejosPorRango {
  rango: string;
  min: number;
  max: number;
  consejos: Consejo[];
}

export interface ConsejosSector {
  [sector: string]: ConsejosPorRango[];
}

export const CONSEJOS_SECTOR: ConsejosSector = {
  // Consejos para el sector de Acuicultura
  'Acuicultura': [
    {
      rango: '0-20',
      min: 0,
      max: 20,
      consejos: [
        {
          titulo: 'Implementar sensores básicos de monitoreo',
          descripcion: 'Comenzar con la instalación de sensores básicos para monitorear parámetros críticos como temperatura, oxígeno y pH en estanques y jaulas. Estos datos pueden recopilarse manualmente para análisis iniciales.'
        },
        {
          titulo: 'Digitalizar registros operativos',
          descripcion: 'Migrar los registros en papel a formatos digitales utilizando herramientas simples como hojas de cálculo para facilitar el seguimiento de la producción, alimentación y tratamientos.'
        },
        {
          titulo: 'Capacitación en tecnologías básicas',
          descripcion: 'Formar al personal en el uso de herramientas digitales básicas y concientizar sobre la importancia de la recopilación precisa de datos para futuras implementaciones tecnológicas.'
        }
      ]
    },
    {
      rango: '20-40',
      min: 20,
      max: 40,
      consejos: [
        {
          titulo: 'Sistemas automatizados de alimentación',
          descripcion: 'Implementar alimentadores automáticos programables que optimicen las raciones según horarios establecidos, reduciendo el desperdicio y mejorando la conversión alimenticia.'
        },
        {
          titulo: 'Monitoreo remoto de parámetros',
          descripcion: 'Instalar sistemas de monitoreo continuo con transmisión de datos en tiempo real para parámetros críticos como oxígeno disuelto, temperatura y turbidez, con alertas automáticas ante valores anormales.'
        },
        {
          titulo: 'Trazabilidad digital básica',
          descripcion: 'Implementar un sistema digital de trazabilidad que permita seguir el ciclo de vida del producto desde la siembra hasta la cosecha, facilitando la gestión de calidad y cumplimiento normativo.'
        }
      ]
    },
    {
      rango: '40-60',
      min: 40,
      max: 60,
      consejos: [
        {
          titulo: 'Análisis predictivo de calidad de agua',
          descripcion: 'Utilizar software de análisis que combine datos históricos y en tiempo real para predecir cambios en la calidad del agua y anticipar problemas potenciales, permitiendo intervenciones preventivas.'
        },
        {
          titulo: 'Sistemas inteligentes de clasificación',
          descripcion: 'Implementar tecnologías de visión artificial para la clasificación automática de peces por tamaño y detección temprana de anomalías o enfermedades, mejorando la eficiencia en la selección.'
        },
        {
          titulo: 'Plataforma integrada de gestión',
          descripcion: 'Adoptar una plataforma digital que centralice la información de producción, inventario, alimentación y parámetros ambientales, facilitando la toma de decisiones basada en datos.'
        }
      ]
    },
    {
      rango: '60-80',
      min: 60,
      max: 80,
      consejos: [
        {
          titulo: 'Gemelos digitales de producción',
          descripcion: 'Desarrollar modelos virtuales de las instalaciones acuícolas que simulen condiciones reales y permitan optimizar procesos, predecir resultados de cambios operativos y entrenar al personal.'
        },
        {
          titulo: 'IoT avanzado y análisis en la nube',
          descripcion: 'Implementar una red completa de dispositivos IoT que monitoreen todos los aspectos de la producción, con análisis en la nube que genere insights automáticos y recomendaciones de optimización.'
        },
        {
          titulo: 'Automatización de procesos post-cosecha',
          descripcion: 'Integrar sistemas robotizados para el procesamiento post-cosecha, incluyendo clasificación, fileteado y empaque, mejorando la consistencia del producto y reduciendo costos operativos.'
        }
      ]
    },
    {
      rango: '80-100',
      min: 80,
      max: 100,
      consejos: [
        {
          titulo: 'Inteligencia artificial para optimización biológica',
          descripcion: 'Implementar sistemas de IA que analicen patrones de crecimiento, salud y comportamiento de las especies cultivadas para optimizar condiciones de cultivo, predecir brotes de enfermedades y personalizar estrategias de alimentación.'
        },
        {
          titulo: 'Blockchain para trazabilidad completa',
          descripcion: 'Adoptar tecnología blockchain para crear un registro inmutable y transparente de toda la cadena de valor, desde insumos hasta consumidor final, garantizando autenticidad y facilitando certificaciones.'
        },
        {
          titulo: 'Sistemas autónomos de producción',
          descripcion: 'Implementar granjas acuícolas parcialmente autónomas con monitoreo, alimentación y mantenimiento automatizados, utilizando drones submarinos para inspección y robots para tareas de mantenimiento rutinarias.'
        }
      ]
    }
  ],
  
  // Consejos para el sector de Construcción
  'Construcción': [
    {
      rango: '0-20',
      min: 0,
      max: 20,
      consejos: [
        {
          titulo: 'Adoptar software básico de gestión',
          descripcion: 'Implementar herramientas digitales básicas para la planificación de proyectos, presupuestos y seguimiento de avances, reemplazando los métodos manuales tradicionales.'
        },
        {
          titulo: 'Digitalizar documentación técnica',
          descripcion: 'Migrar planos y especificaciones técnicas a formatos digitales, facilitando el acceso, actualización y distribución de información entre los equipos de trabajo.'
        },
        {
          titulo: 'Capacitación digital fundamental',
          descripcion: 'Formar al personal en competencias digitales básicas y uso de dispositivos móviles para reportes de campo y acceso a información técnica en obra.'
        }
      ]
    },
    {
      rango: '20-40',
      min: 20,
      max: 40,
      consejos: [
        {
          titulo: 'Modelado BIM básico',
          descripcion: 'Iniciar la implementación de Building Information Modeling (BIM) para la visualización 3D de proyectos, mejorando la detección de interferencias y la comunicación entre disciplinas.'
        },
        {
          titulo: 'Monitoreo digital en obra',
          descripcion: 'Utilizar aplicaciones móviles para el seguimiento de avances, registro fotográfico georreferenciado y reporte de incidencias en tiempo real desde el sitio de construcción.'
        },
        {
          titulo: 'Gestión digital de inventarios',
          descripcion: 'Implementar sistemas digitales para el control de materiales y equipos, optimizando la logística de suministros y reduciendo pérdidas por inventarios mal gestionados.'
        }
      ]
    },
    {
      rango: '40-60',
      min: 40,
      max: 60,
      consejos: [
        {
          titulo: 'BIM colaborativo multidisciplinario',
          descripcion: 'Expandir el uso de BIM para la colaboración entre todas las disciplinas involucradas, incluyendo análisis de constructibilidad, secuencias de construcción y detección avanzada de conflictos.'
        },
        {
          titulo: 'Drones para topografía y seguimiento',
          descripcion: 'Incorporar drones para levantamientos topográficos, inspecciones de avance y monitoreo de seguridad, generando datos precisos y visualizaciones actualizadas del proyecto.'
        },
        {
          titulo: 'Prefabricación digital',
          descripcion: 'Implementar procesos de diseño digital para componentes prefabricados, mejorando la precisión, reduciendo desperdicios y acelerando los tiempos de instalación en obra.'
        }
      ]
    },
    {
      rango: '60-80',
      min: 60,
      max: 80,
      consejos: [
        {
          titulo: 'Gemelos digitales de edificaciones',
          descripcion: 'Desarrollar modelos virtuales completos que integren información de diseño, construcción y operación, facilitando simulaciones avanzadas y optimización de procesos constructivos.'
        },
        {
          titulo: 'IoT en equipos y maquinaria',
          descripcion: 'Implementar sensores IoT en equipos de construcción para monitoreo de rendimiento, mantenimiento predictivo y optimización de uso, reduciendo tiempos muertos y costos operativos.'
        },
        {
          titulo: 'Realidad aumentada en construcción',
          descripcion: 'Utilizar tecnologías de realidad aumentada para superponer información de diseño BIM sobre el entorno real, facilitando la instalación precisa de componentes y la detección de desviaciones.'
        }
      ]
    },
    {
      rango: '80-100',
      min: 80,
      max: 100,
      consejos: [
        {
          titulo: 'Construcción robotizada',
          descripcion: 'Implementar robots y sistemas automatizados para tareas repetitivas como colocación de ladrillos, acabados o inspecciones, mejorando la precisión y reduciendo riesgos laborales.'
        },
        {
          titulo: 'IA para optimización de diseño y construcción',
          descripcion: 'Utilizar algoritmos de inteligencia artificial para generar y evaluar múltiples alternativas de diseño, optimizar secuencias constructivas y predecir problemas potenciales antes de la ejecución.'
        },
        {
          titulo: 'Edificios inteligentes conectados',
          descripcion: 'Integrar sistemas de gestión inteligente en las edificaciones desde la fase de diseño, permitiendo monitoreo y control automatizado de todos los sistemas durante la vida útil de la estructura.'
        }
      ]
    }
  ],
  
  // Consejos para el sector de Manufactura
  'Manufactura': [
    {
      rango: '0-20',
      min: 0,
      max: 20,
      consejos: [
        {
          titulo: 'Digitalización de registros de producción',
          descripcion: 'Migrar los registros manuales de producción, calidad e inventario a formatos digitales básicos, facilitando el acceso a la información y análisis preliminares.'
        },
        {
          titulo: 'Implementar control de calidad digital',
          descripcion: 'Adoptar herramientas digitales simples para el registro y seguimiento de parámetros de calidad, permitiendo la identificación de tendencias y problemas recurrentes.'
        },
        {
          titulo: 'Capacitación en fundamentos digitales',
          descripcion: 'Formar al personal operativo en el uso de dispositivos digitales y sistemas básicos de registro, creando una base para futuras implementaciones tecnológicas.'
        }
      ]
    },
    {
      rango: '20-40',
      min: 20,
      max: 40,
      consejos: [
        {
          titulo: 'Monitoreo básico de máquinas',
          descripcion: 'Instalar sensores básicos en equipos críticos para monitorear parámetros operativos como temperatura, vibración y consumo energético, facilitando la detección temprana de anomalías.'
        },
        {
          titulo: 'Sistema MES básico',
          descripcion: 'Implementar un sistema de ejecución de manufactura (MES) básico para la planificación de producción, seguimiento de órdenes y registro digital de operaciones.'
        },
        {
          titulo: 'Trazabilidad digital de productos',
          descripcion: 'Adoptar sistemas de códigos de barras o QR para el seguimiento de productos a lo largo del proceso productivo, mejorando la trazabilidad y control de inventarios.'
        }
      ]
    },
    {
      rango: '40-60',
      min: 40,
      max: 60,
      consejos: [
        {
          titulo: 'Integración vertical de sistemas',
          descripcion: 'Conectar los sistemas de planta (OT) con los sistemas de gestión empresarial (IT), permitiendo el flujo bidireccional de información y mejorando la toma de decisiones.'
        },
        {
          titulo: 'Mantenimiento predictivo básico',
          descripcion: 'Implementar análisis de datos de equipos para predecir fallos potenciales, programando mantenimientos preventivos basados en condiciones reales y no en calendarios fijos.'
        },
        {
          titulo: 'Automatización de procesos repetitivos',
          descripcion: 'Identificar e implementar automatizaciones en procesos manuales repetitivos, utilizando robots colaborativos o sistemas automáticos para mejorar eficiencia y consistencia.'
        }
      ]
    },
    {
      rango: '60-80',
      min: 60,
      max: 80,
      consejos: [
        {
          titulo: 'Gemelos digitales de procesos',
          descripcion: 'Desarrollar réplicas virtuales de líneas de producción que permitan simular cambios, optimizar parámetros y entrenar operadores sin interrumpir la producción real.'
        },
        {
          titulo: 'Analítica avanzada de producción',
          descripcion: 'Implementar sistemas de análisis avanzado que procesen datos de múltiples fuentes para identificar patrones ocultos, optimizar procesos y predecir resultados de calidad.'
        },
        {
          titulo: 'Sistemas de visión artificial',
          descripcion: 'Integrar tecnologías de visión por computadora para inspección automática de calidad, detección de defectos y verificación de ensamblaje, reduciendo errores humanos.'
        }
      ]
    },
    {
      rango: '80-100',
      min: 80,
      max: 100,
      consejos: [
        {
          titulo: 'Fábrica completamente conectada',
          descripcion: 'Implementar una infraestructura IoT integral donde todos los equipos, productos y sistemas estén conectados en tiempo real, permitiendo decisiones autónomas y optimización continua.'
        },
        {
          titulo: 'Manufactura autónoma y adaptativa',
          descripcion: 'Desarrollar sistemas de producción que se auto-optimicen mediante inteligencia artificial, ajustando parámetros automáticamente según condiciones cambiantes y objetivos de producción.'
        },
        {
          titulo: 'Personalización masiva inteligente',
          descripcion: 'Implementar sistemas flexibles que permitan la personalización de productos a escala industrial, utilizando IA para optimizar configuraciones y minimizar tiempos de cambio.'
        }
      ]
    }
  ],
  
  // Plantilla para otros sectores
  'Otro': [
    {
      rango: '0-20',
      min: 0,
      max: 20,
      consejos: [
        {
          titulo: 'Digitalización básica de procesos',
          descripcion: 'Comenzar con la digitalización de registros y procesos manuales utilizando herramientas ofimáticas básicas para crear una base de datos inicial.'
        },
        {
          titulo: 'Adopción de herramientas colaborativas',
          descripcion: 'Implementar herramientas digitales para comunicación y colaboración entre equipos, facilitando el intercambio de información y la coordinación de actividades.'
        },
        {
          titulo: 'Capacitación digital fundamental',
          descripcion: 'Desarrollar un programa básico de capacitación en competencias digitales para todo el personal, creando una cultura receptiva a la transformación tecnológica.'
        }
      ]
    },
    {
      rango: '20-40',
      min: 20,
      max: 40,
      consejos: [
        {
          titulo: 'Análisis de datos básico',
          descripcion: 'Implementar herramientas simples de análisis de datos para identificar patrones, tendencias y oportunidades de mejora en los procesos existentes.'
        },
        {
          titulo: 'Automatización de tareas rutinarias',
          descripcion: 'Identificar y automatizar procesos repetitivos de bajo valor agregado utilizando herramientas de automatización básicas o RPA (Robotic Process Automation).'
        },
        {
          titulo: 'Implementación de CRM/ERP básico',
          descripcion: 'Adoptar sistemas de gestión empresarial que centralicen la información y faciliten la toma de decisiones basadas en datos actualizados.'
        }
      ]
    },
    {
      rango: '40-60',
      min: 40,
      max: 60,
      consejos: [
        {
          titulo: 'Integración de sistemas',
          descripcion: 'Conectar los diferentes sistemas y fuentes de datos de la organización para crear un flujo de información continuo y eliminar silos departamentales.'
        },
        {
          titulo: 'Implementación de IoT básico',
          descripcion: 'Comenzar a implementar sensores y dispositivos conectados en áreas críticas para monitoreo en tiempo real y recopilación automática de datos.'
        },
        {
          titulo: 'Análisis predictivo inicial',
          descripcion: 'Desarrollar modelos analíticos básicos que permitan anticipar tendencias y comportamientos basados en datos históricos y actuales.'
        }
      ]
    },
    {
      rango: '60-80',
      min: 60,
      max: 80,
      consejos: [
        {
          titulo: 'Implementación de gemelos digitales',
          descripcion: 'Desarrollar representaciones virtuales de procesos, productos o servicios que permitan simulaciones avanzadas y optimizaciones sin riesgo operativo.'
        },
        {
          titulo: 'Analítica avanzada e IA',
          descripcion: 'Implementar soluciones de inteligencia artificial y machine learning para optimización de procesos, personalización de servicios y automatización inteligente.'
        },
        {
          titulo: 'Ecosistema digital integrado',
          descripcion: 'Crear un ecosistema digital completo que conecte a clientes, proveedores y socios en una plataforma colaborativa que agilice transacciones y mejore la experiencia.'
        }
      ]
    },
    {
      rango: '80-100',
      min: 80,
      max: 100,
      consejos: [
        {
          titulo: 'Operaciones autónomas',
          descripcion: 'Implementar sistemas que tomen decisiones operativas de forma autónoma basadas en IA, optimizando continuamente procesos sin intervención humana directa.'
        },
        {
          titulo: 'Innovación disruptiva de modelo de negocio',
          descripcion: 'Utilizar tecnologías avanzadas para transformar radicalmente el modelo de negocio, creando nuevas propuestas de valor y fuentes de ingresos basadas en datos y servicios digitales.'
        },
        {
          titulo: 'Organización completamente adaptativa',
          descripcion: 'Desarrollar una estructura organizacional flexible y adaptativa que responda en tiempo real a cambios del mercado, utilizando datos e IA para anticipar y liderar transformaciones en la industria.'
        }
      ]
    }
  ],
  // Consejos para el sector de CARNICO
  'CARNICO': [
    {
      rango: '0-20',
      min: 0,
      max: 20,
      consejos: [
        {
          titulo: 'Digitalización básica de procesos cárnicos',
          descripcion: 'Iniciar con la digitalización de registros de producción y controles de higiene, utilizando herramientas simples para llevar el seguimiento de lotes y tiempos de procesado.'
        },
        {
          titulo: 'Capacitación en normas de calidad digital',
          descripcion: 'Formar al personal en el uso de herramientas digitales para mejorar la trazabilidad y garantizar el cumplimiento de normas sanitarias y de seguridad.'
        },
        {
          titulo: 'Mantenimiento de registros digitales',
          descripcion: 'Establecer un sistema digital para registrar y analizar datos críticos del proceso cárnico, facilitando auditorías y control de calidad.'
        }
      ]
    },
    {
      rango: '20-40',
      min: 20,
      max: 40,
      consejos: [
        {
          titulo: 'Implementar sensores de temperatura y humedad',
          descripcion: 'Usar dispositivos IoT para monitorear condiciones en salas de refrigeración y almacenamiento, asegurando la calidad y seguridad del producto.'
        },
        {
          titulo: 'Automatización parcial de procesos',
          descripcion: 'Incorporar herramientas digitales que automaticen tareas repetitivas, optimizando tiempos de procesamiento y reduciendo errores humanos.'
        },
        {
          titulo: 'Digitalización de inventarios',
          descripcion: 'Utilizar sistemas básicos para el control y seguimiento de inventario, mejorando la gestión de stock y reduciendo pérdidas por caducidad.'
        }
      ]
    },
    {
      rango: '40-60',
      min: 40,
      max: 60,
      consejos: [
        {
          titulo: 'Integración de sistemas de trazabilidad',
          descripcion: 'Conectar diferentes sistemas para crear una cadena digital de trazabilidad que garantice la calidad y autenticidad del producto.'
        },
        {
          titulo: 'Optimización de procesos con RFID',
          descripcion: 'Implementar tecnología RFID para el seguimiento en tiempo real de productos cárnicos, facilitando la logística y el control de inventarios.'
        },
        {
          titulo: 'Desarrollo de sistemas MES',
          descripcion: 'Adoptar un sistema de ejecución de manufactura que integre la planificación, producción y control de calidad en un único flujo digital.'
        }
      ]
    },
    {
      rango: '60-80',
      min: 60,
      max: 80,
      consejos: [
        {
          titulo: 'Gemelos digitales para procesos cárnicos',
          descripcion: 'Crear réplicas virtuales de la línea de producción para optimizar procesos, simular escenarios y mejorar la eficiencia operativa.'
        },
        {
          titulo: 'Analítica avanzada para control de calidad',
          descripcion: 'Utilizar herramientas de análisis de datos para predecir desviaciones en la calidad del producto y realizar intervenciones preventivas.'
        },
        {
          titulo: 'Automatización de controles sanitarios',
          descripcion: 'Incorporar sistemas automatizados que realicen controles de higiene y sanitización, garantizando el cumplimiento de estándares y normativas.'
        }
      ]
    },
    {
      rango: '80-100',
      min: 80,
      max: 100,
      consejos: [
        {
          titulo: 'Automatización avanzada de envasado',
          descripcion: 'Implementar líneas de producción automatizadas para el envasado y embalaje, asegurando la consistencia y optimización de tiempos.'
        },
        {
          titulo: 'Inteligencia artificial para control de calidad',
          descripcion: 'Utilizar algoritmos de IA que analicen datos en tiempo real para detectar anomalías y predecir demandas, optimizando procesos de producción.'
        },
        {
          titulo: 'Plataforma integrada de gestión cárnica',
          descripcion: 'Adoptar una plataforma digital que centralice la información de producción, inventario y calidad para mejorar la toma de decisiones estratégicas.'
        }
      ]
    }
  ]
}; 