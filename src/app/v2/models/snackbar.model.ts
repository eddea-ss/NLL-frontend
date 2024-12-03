export type SnackbarType = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarMessage {
  text: string;
  duration?: number;
  type?: SnackbarType;
}
