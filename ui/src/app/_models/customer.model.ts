import { Industry } from './industry.model';

export interface Customer {
  id?: number;
  name: string;
  surname: string;
  birthDate: string;
  industry: Industry;
  phoneNumber: string;
  email: string;
}
