import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LoginService, RecordsService } from '@v2/services';
import { AuthState, Role, UserType } from '@v2/enums';
import { EVALUACION_PROVEEDORES } from '@v2/constants';
import {
  BreadcrumbsComponent,
  StepRegisterComponent,
  TitleSectionComponent,
  SupplierModalComponent,
} from '@v2/components';
import {
  surveyJsonA,
  surveyJsonB,
  surveyJsonC,
  surveyJsonD,
  surveyJsonE,
} from '@v2/constants';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, of } from 'rxjs';

// Interface for API response data
interface SupplierApiResponse {
  rut_md5: string;
  nombreEmpresa: string;
  nombreCompletoContacto: string;
  tipoEmpresa: string;
  sectoresAtencionPrincipal: string;
  aniosExperienciaTecnologica: string;
  cantidadTrabajadores: string;
  tecnologiasOfrecidas: string;
  sitioWebEmpresa?: string;
  telefonoContactoEmpresa: string;
  correoElectronicoEmpresa: string;
  correoElectronicoContacto: string;
  telefonoContactoPersonal: string;
  areaDeTrabajoEmpresa: string;
  integracionTecnologias?: string;
  adaptacionSoluciones?: string;
  casosExitoCompartibles?: string;
  posibilidadVisitarClientesReferencia?: string;
  reconocimientosPremios?: string;
  localizacionClientesVisita?: string;
  programaFormacionPersonal?: string;
  ciudadesSoporteTecnicoPresencial?: string;
  procesoActualizacionesSistemas?: string;
  serviciosAdicionales?: string;
}

// Interface for featured company data
interface FeaturedCompany {
  id: string;
  name: string;
  industry: string;
  description: string;
  tags: string[];
  location: string;
  verified: boolean;
  initials: string;
  profileUrl: string;
  headerGradient?: string;
  avatarBg?: string;
  avatarColor?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
}

@Component({
  selector: 'app-evaluaciones-proveedor',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    TitleSectionComponent,
    StepRegisterComponent,
    RouterLink,
    SupplierModalComponent,
  ],
  templateUrl: './evaluaciones-proveedor.component.html',
  styleUrl: './evaluaciones-proveedor.component.scss',
})
export class EvaluacionesProveedorComponent implements OnInit {
  private loginService = inject(LoginService);
  //private modeloCaracterService = inject(CharacterizationModelService);
  private recordsService = inject(RecordsService);
  private http = inject(HttpClient);

  private title = inject(Title);
  private meta = inject(Meta);

  // API URL for featured companies
  private readonly apiUrl = 'https://control.nuevoloslagos.org/suppliers/search?search=iot';

  authState = this.loginService.authState;
  currentUser = this.loginService.currentUser;
  supplierSurvey = this.recordsService.supplierSurvey;

  public AuthState = AuthState;
  public UserType = UserType;
  public Role = Role;

  // Featured companies properties
  featuredCompanies: FeaturedCompany[] = [];
  loadingFeaturedCompanies = false;
  errorFeaturedCompanies: string | null = null;

  // Gradient and color options for company cards
  private gradients = [
    'linear-gradient(to right, #4338ca, #312e81)',
    'linear-gradient(to right, #6d28d9, #4c1d95)',
    'linear-gradient(to right, #1d4ed8, #1e40af)',
    'linear-gradient(to right, #0f766e, #134e4a)',
    'linear-gradient(to right, #7c3aed, #4c1d95)',
    'linear-gradient(to right, #0891b2, #0e7490)'
  ];
  
  private avatarBgColors = [
    '#e0e7ff', '#f3e8ff', '#dbeafe', '#ccfbf1', '#e9d5ff', '#cffafe'
  ];
  
  private avatarTextColors = [
    '#3730a3', '#6b21a8', '#1e40af', '#115e59', '#6d28d9', '#0e7490'
  ];

  breadcrumbs: any[] = EVALUACION_PROVEEDORES;

  titlesSurvey: string[] = [
    surveyJsonA.title,
    surveyJsonB.title,
    surveyJsonC.title,
    surveyJsonD.title,
    surveyJsonE.title,
  ];

  steps = [
    {
      title: 'Regístrate',
      description:
        'Haz clic en el botón Registrarse en la barra de navegación y selecciona la opción Proveedor para la Región de los Lagos. ¡Empieza ahora y conéctate con clientes de tu región!',
    },
    {
      title: 'Completa tu Modelo',
      description:
        'Completa tu modelo de Caracterización de Proveedores y comparte los datos necesarios para que podamos conectarte con clientes de tu región. ¡Empieza ahora y abre la puerta a nuevas oportunidades!',
    },
    {
      title: 'Descubre',
      description:
        'Descubre las acciones clave para promoverte en la Región de los Lagos. Accede a cursos, artículos, opciones de financiamiento y muchos otros recursos informativos diseñados para tu éxito. ¡Empieza hoy mismo y lleva tu negocio al siguiente nivel!',
    },
  ];

  // Signal del ModeloMadurezService
  //modeloCaracter = this.modeloCaracterService.modeloCaracter;

  // Modal properties
  isModalOpen = false;
  selectedCompany: any = null;

  constructor() {
    effect(() => {
      const authState = this.authState();
      const user = this.currentUser();
      this.recordsService.recheckData();
    });
  }

  ngOnInit(): void {
    // Establecer el título de la página
    this.title.setTitle('Caracterización de Proveedores | Nuevo Los Lagos');

    // Agregar meta etiquetas
    this.meta.updateTag({
      name: 'description',
      content:
        'Define tu modelo de Caracterización de Proveedores y descubre cómo conectarte con clientes de tu región. Da el siguiente paso y amplía tus oportunidades de negocio.',
    });

    // Load featured companies when component initializes
    this.loadFeaturedCompanies();
  }

  /**
   * Loads featured companies from the API
   */
  loadFeaturedCompanies(): void {
    this.loadingFeaturedCompanies = true;
    this.errorFeaturedCompanies = null;

    this.http.get<SupplierApiResponse[]>(this.apiUrl)
      .pipe(
        map(suppliers => this.transformSupplierData(suppliers)),
        catchError(error => {
          console.error('Error loading featured companies:', error);
          this.errorFeaturedCompanies = 'No se pudieron cargar las empresas destacadas. Por favor, intenta nuevamente más tarde.';
          
          // Return fallback data when API is not available
          return of(this.getFallbackCompanies());
        }),
        finalize(() => {
          this.loadingFeaturedCompanies = false;
        })
      )
      .subscribe(companies => {
        this.featuredCompanies = companies;
      });
  }

  /**
   * Transforms supplier API data to the FeaturedCompany format
   */
  private transformSupplierData(suppliers: SupplierApiResponse[]): FeaturedCompany[] {
    // Limit to 4 companies for the featured section
    const limitedSuppliers = suppliers.slice(0, 4);
    
    return limitedSuppliers.map((supplier, index) => {
      // Extract technologies as tags
      const tags = supplier.tecnologiasOfrecidas
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== 'Otra');
      
      // Generate initials from company name
      const initials = this.generateInitials(supplier.nombreEmpresa);
      
      // Determine location based on company type
      let location = 'Chile';
      if (supplier.tipoEmpresa.includes('región de Los Lagos exclusivamente')) {
        location = 'Región de Los Lagos, Chile';
      } else if (supplier.tipoEmpresa.includes('región de Los Lagos y también en otras regiones')) {
        location = 'Región de Los Lagos y otras, Chile';
      }
      
      // Get visual styles based on index
      const colorIndex = index % this.gradients.length;
      
      return {
        id: supplier.rut_md5,
        name: supplier.nombreEmpresa,
        industry: this.getIndustryFromSectors(supplier.sectoresAtencionPrincipal),
        description: this.generateDescription(supplier),
        tags: tags,
        location: location,
        verified: true, // Assuming all companies in the API are verified
        initials: initials,
        profileUrl: `/directorio-empresas/${supplier.rut_md5}`,
        headerGradient: this.gradients[colorIndex],
        avatarBg: this.avatarBgColors[colorIndex],
        avatarColor: this.avatarTextColors[colorIndex],
        contactName: supplier.nombreCompletoContacto,
        contactEmail: supplier.correoElectronicoContacto,
        contactPhone: supplier.telefonoContactoPersonal,
        website: supplier.sitioWebEmpresa
      };
    });
  }

  /**
   * Generates initials from a company name
   */
  private generateInitials(name: string): string {
    // Split by spaces and get first letter of each word
    const words = name.split(/\s+/);
    
    if (words.length === 1) {
      // If single word, take first two letters
      return name.substring(0, 2).toUpperCase();
    } else {
      // Take first letter of first two words
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
  }

  /**
   * Extracts main industry from sectors string
   */
  private getIndustryFromSectors(sectors: string): string {
    const sectorList = sectors.split(',');
    // Return first sector as the main industry
    return sectorList[0].trim().replace('Sector ', '');
  }

  /**
   * Generates a description based on supplier data
   */
  private generateDescription(supplier: SupplierApiResponse): string {
    let description = '';
    
    // Add experience
    if (supplier.aniosExperienciaTecnologica) {
      if (supplier.aniosExperienciaTecnologica.includes('Más de 10 años')) {
        description += 'Empresa con amplia experiencia ';
      } else if (supplier.aniosExperienciaTecnologica.includes('Entre 4 y 6 años')) {
        description += 'Empresa con experiencia consolidada ';
      } else {
        description += 'Empresa innovadora ';
      }
    }
    
    // Add size
    if (supplier.cantidadTrabajadores) {
      if (supplier.cantidadTrabajadores.includes('Más de')) {
        description += 'de tamaño mediano ';
      } else {
        description += 'de tamaño pequeño ';
      }
    }
    
    // Add focus
    description += 'especializada en ' + this.getIndustryFromSectors(supplier.sectoresAtencionPrincipal);
    
    // Add technologies
    const techs = supplier.tecnologiasOfrecidas.split(',').map(t => t.trim()).filter(t => t !== 'Otra');
    if (techs.length > 0) {
      description += ', con enfoque en ' + techs.slice(0, 2).join(' y ');
      if (techs.length > 2) {
        description += ', entre otras tecnologías';
      }
    }
    
    description += '.';
    return description;
  }

  /**
   * Provides fallback data for development or when API is not available
   */
  private getFallbackCompanies(): FeaturedCompany[] {
    return [
      {
        id: '1e09aa091e6e48f1c24c076709cac1c4',
        name: 'Aim-Tech',
        industry: 'Acuicultura',
        description: 'Empresa innovadora de tamaño pequeño especializada en Acuicultura, con enfoque en Internet de las cosas (IoT) y Inteligencia Artificial, entre otras tecnologías.',
        tags: ['Internet de las cosas (IoT)', 'Gemelos Digitales', 'Inteligencia Artificial', 'Big Data'],
        location: 'Chile',
        verified: true,
        initials: 'AT',
        profileUrl: '/directorio-empresas/1e09aa091e6e48f1c24c076709cac1c4',
        headerGradient: 'linear-gradient(to right, #4338ca, #312e81)',
        avatarBg: '#e0e7ff',
        avatarColor: '#3730a3',
        contactName: 'David Villaseca Fernández',
        contactEmail: 'dvf@techinnovation.cl',
        contactPhone: '+56997780498',
        website: 'https://aim-tech.cl/'
      },
      {
        id: '47cdf55c37fb24e258b01a4d7f1dc8fc',
        name: 'Intertec Chile',
        industry: 'Acuicultura',
        description: 'Empresa con amplia experiencia de tamaño pequeño especializada en Acuicultura, con enfoque en Internet de las cosas (IoT) y Gemelos Digitales, entre otras tecnologías.',
        tags: ['Internet de las cosas (IoT)', 'Gemelos Digitales', 'Big Data', 'Ciberseguridad', 'Inteligencia Artificial', 'Realidad Aumentada'],
        location: 'Chile',
        verified: true,
        initials: 'IC',
        profileUrl: '/directorio-empresas/47cdf55c37fb24e258b01a4d7f1dc8fc',
        headerGradient: 'linear-gradient(to right, #6d28d9, #4c1d95)',
        avatarBg: '#f3e8ff',
        avatarColor: '#6b21a8',
        contactName: 'Angel Granado',
        contactEmail: 'ang@intertec.dk',
        contactPhone: '+56997459688',
        website: 'https://www.intertec.cl/'
      },
      {
        id: '7c15b8b863bdf5f01a68c35249392b34',
        name: 'CREAD INGENIERIA SPA',
        industry: 'Acuicultura',
        description: 'Empresa con experiencia consolidada de tamaño pequeño especializada en Acuicultura, con enfoque en Internet de las cosas (IoT) y Simulación, entre otras tecnologías.',
        tags: ['Internet de las cosas (IoT)', 'Simulación', 'Inteligencia Artificial', 'Diseño 3D'],
        location: 'Región de Los Lagos y otras, Chile',
        verified: true,
        initials: 'CI',
        profileUrl: '/directorio-empresas/7c15b8b863bdf5f01a68c35249392b34',
        headerGradient: 'linear-gradient(to right, #1d4ed8, #1e40af)',
        avatarBg: '#dbeafe',
        avatarColor: '#1e40af',
        contactName: 'Jorge Avila',
        contactEmail: 'creadingenieria@gmail.com',
        contactPhone: '+56932329930'
      },
      {
        id: '9501e0012f7d1d82688dc45d6341afc5',
        name: 'Rogel Manufacturing Co.',
        industry: 'Manufactura',
        description: 'Empresa con amplia experiencia de tamaño mediano especializada en Manufactura, con enfoque en Simulación y Internet de las cosas (IoT), entre otras tecnologías.',
        tags: ['Simulación', 'Internet de las cosas (IoT)', 'Inteligencia Artificial', 'Impresión 3D', 'Realidad Aumentada', 'Diseño 3D'],
        location: 'Región de Los Lagos, Chile',
        verified: true,
        initials: 'RM',
        profileUrl: '/directorio-empresas/9501e0012f7d1d82688dc45d6341afc5',
        headerGradient: 'linear-gradient(to right, #0f766e, #134e4a)',
        avatarBg: '#ccfbf1',
        avatarColor: '#115e59',
        contactName: 'Pablo Rogel Alvarez',
        contactEmail: 'p.rogel.a@hotmail.com',
        contactPhone: '+56990351098',
        website: 'www.rogelmanufacturing.cl'
      }
    ];
  }

  openLink(): void {}

  getSurveyData(index: number): boolean {
    const key: string = 'part' + index;
    switch (key) {
      case 'part1':
        return this.supplierSurvey().part1 === true;
      case 'part2':
        return this.supplierSurvey().part2 === true;
      case 'part3':
        return this.supplierSurvey().part3 === true;
      case 'part4':
        return this.supplierSurvey().part4 === true;
      case 'part5':
        return this.supplierSurvey().part5 === true;
      default:
        return true;
    }
  }

  /**
   * Opens the company profile modal
   */
  openCompanyModal(company: FeaturedCompany): void {
    // Convert FeaturedCompany to the format expected by SupplierModalComponent
    this.selectedCompany = this.convertToSupplierModalFormat(company);
    this.isModalOpen = true;
  }

  /**
   * Closes the company profile modal
   */
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCompany = null;
  }

  /**
   * Converts a FeaturedCompany object to the format expected by SupplierModalComponent
   */
  private convertToSupplierModalFormat(company: FeaturedCompany): any {
    return {
      nombreEmpresa: company.name,
      sitioWebEmpresa: company.website || '',
      telefonoContactoEmpresa: company.contactPhone || 'No disponible',
      correoElectronicoEmpresa: company.contactEmail || 'No disponible',
      areaDeTrabajoEmpresa: company.industry || 'No especificada',
      aniosExperienciaTecnologica: this.getExperienceFromDescription(company.description) || 'No especificada',
      sectoresAtencionPrincipal: company.industry || 'No especificada',
      cantidadTrabajadores: this.getSizeFromDescription(company.description) || 'No especificada',
      tecnologiasOfrecidas: company.tags.join(', ') || 'No especificadas',
      productosServiciosAvanzados: 'No especificados',
      productosOfrecidos: 'No especificados',
      serviciosOfrecidos: 'No especificados',
      rut_md5: company.id
    };
  }

  /**
   * Extracts experience information from company description
   */
  private getExperienceFromDescription(description: string): string {
    if (description.includes('amplia experiencia')) {
      return 'Más de 10 años';
    } else if (description.includes('experiencia consolidada')) {
      return 'Entre 4 y 6 años';
    } else if (description.includes('innovadora')) {
      return 'Entre 1 y 3 años';
    }
    return 'No especificada';
  }

  /**
   * Extracts company size information from description
   */
  private getSizeFromDescription(description: string): string {
    if (description.includes('tamaño mediano')) {
      return 'Entre 10 y 49 trabajadores';
    } else if (description.includes('tamaño pequeño')) {
      return 'Menos de 10 trabajadores';
    }
    return 'No especificada';
  }
}
