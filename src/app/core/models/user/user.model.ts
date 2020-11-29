import { Role } from '../../enums/role';

export interface User {
  id?: number,
  name : string,
  email: string,
  role: Role;
  token?: string;
}
