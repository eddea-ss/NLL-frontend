import { UserType, Sector } from '@v2/enums';

export interface User {
  rut: string;
  name: string;
  sector: Sector;
  type: UserType;
  url: string;
}
