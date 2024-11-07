import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isSidebarOpen: WritableSignal<boolean> = signal(false);

  get isSidebarOpen(): WritableSignal<boolean> {
    return this._isSidebarOpen.asReadonly() as WritableSignal<boolean>;
  }

  toggleSidebar(): void {
    this.setSidebarState(!this._isSidebarOpen());
  }

  openSidebar(): void {
    this.setSidebarState(true);
  }

  closeSidebar(): void {
    this.setSidebarState(false);
  }

  private setSidebarState(isOpen: boolean): void {
    this._isSidebarOpen.set(isOpen);
  }
}
