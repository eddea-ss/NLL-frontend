export interface Question {
    label: string;
    name: string;
    type: string;
    validators: any[];
    options?: { value: number, label: string }[]; // Para preguntas con opciones (1 a 5)
}