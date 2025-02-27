import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { ResourceService } from '@v2/services';
import { TruncatePipe } from '@v2/pipes';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.scss',
})
export class CourseItemComponent implements OnInit {
  recursosService = inject(ResourceService);

  @Input() data: any;
  @Input() simplified: boolean = false;
  @Output() openModal = new EventEmitter<number>();

  ngOnInit() {
    const userSector = localStorage.getItem('sector');
    if (userSector && this.data) {
      // Split the sector string into an array of keywords
      const sectorKeywords = userSector.toLowerCase().split(',');
      
      // Check each keyword against course content
      this.data.recomendado = sectorKeywords.some(keyword => {
        const cleanKeyword = keyword.trim();
        
        // Check various course fields for keyword matches
        const titleHasKeyword = this.data.titulo?.toLowerCase().includes(cleanKeyword);
        const descriptionHasKeyword = this.data.descripcion?.toLowerCase().includes(cleanKeyword);
        const modalityHasKeyword = this.data.modalidad?.toLowerCase().includes(cleanKeyword);
        const sectorInKnowledgeTypes = this.data.tipo_de_conocimiento?.some((tipo: string) => 
          tipo.toLowerCase().includes(cleanKeyword)
        );
        
        return titleHasKeyword || descriptionHasKeyword || modalityHasKeyword || sectorInKnowledgeTypes;
      });
    }
  }

  onOpenModal() {
    this.openModal.emit();
  }
}
