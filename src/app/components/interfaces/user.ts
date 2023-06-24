export interface User {
  [prop: string]: any;

  id?: number | string | null;
  fname?: string;
  lname?: string;
  phone_primary?: string;
  phone_secondary?: string;
  email?: string;
  password?: string;
  status?: string;
  token?: string;
  address1?: string;
  address2?: string;
  city?: string;
  district?: string;
  country?: number;
  state?: number;
  pincode?: string;
  user_type?: string;
  usertype?: string;
}
