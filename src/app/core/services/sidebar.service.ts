import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public sidebarOpen$: Observable<boolean> = this.sidebarOpenSubject.asObservable(); // Observable para escuchar el estado del sidebar

  constructor() {}

  // Alternar el estado actual del sidebar (abierto/cerrado)
  toggleSidebar(): void {
    this.setSidebarState(!this.sidebarOpenSubject.value);
  }

  // Abrir el sidebar
  openSidebar(): void {
    this.setSidebarState(true);
  }

  // Cerrar el sidebar
  closeSidebar(): void {
    this.setSidebarState(false);
  }

  // Actualizar el estado del sidebar (true = abierto, false = cerrado)
  private setSidebarState(isOpen: boolean): void {
    this.sidebarOpenSubject.next(isOpen);
  }
}
