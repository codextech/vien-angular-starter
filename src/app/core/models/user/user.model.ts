import { Role } from '../../enums/role';

export interface User {
  _id?: number;
  name? : string;
  firstName? :string
  lastName?: string
  email?: string;
  avatar?: string
  roles?: Role[];
  isProfileCompleted?: boolean
  token?: string;
  companySubdomain? : string
}
