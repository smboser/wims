export interface User {
  [prop: string]: any;

  id?: number | string | null;
  fname?: string;
  lname?: string;
  phone_primary?: number;
  phone_secondary?: number;
  email?: string;
  status?: string;
  token?: string;
}
