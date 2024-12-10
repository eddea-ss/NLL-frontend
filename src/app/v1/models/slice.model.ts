export interface Slide {
    type: 'regular' | 'callToAction' | 'custom1' | 'custom2';
    imageUrl?: string;
    content?: string;
    buttonText?: string;
    path?: string;
    
    // Nueva propiedad para la duración en milisegundos
    duration?: number;
  }
  