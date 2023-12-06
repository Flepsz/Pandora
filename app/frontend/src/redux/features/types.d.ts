interface User {
  first_name: string;
  last_name: string;
  register_number: string;
  password: string;
  photo_logo: string
}

interface Account {
  number: string;
  created: Date;
  modified: Date;
  agency: string;
  acc_type: string;
  balance: string;
  limit: string;
  active: boolean;
  customer: number[];
}

interface Accounts {
  accounts: Account[];
}

interface CustomerNP {
  id: number;
  created: Date;
  modified: Date;
  active: boolean;
  name: string;
  social_name: string;
  cpf: string;
  rg: string;
  birthdate: Date;
  customer: number;
}

interface CustomersNP {
  customersnp: CustomerNP[];
}

interface CustomerLP {
  id: number;
  created: Date;
  modified: Date;
  active: boolean;
  fantasy_name: string;
  cnpj: string;
  establishment_date: Date;
  sr: string;
  mr: string;
  customer: number;
}

interface CustomersLP {
  customerslp: CustomerLP[];
}

interface Address {
  id: number;
  created: Date;
  modified: Date;
  active: boolean;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  customer: number;
}

interface Addresses {
  addresses: Address[];
}

export interface Card {
  number: string;
  created: Date;
  modified: Date;
  cvv: string;
  expiration_date: Date;
  flag: string;
  active: boolean;
  account: string;
}

export interface Cards {
  [x: string]: any;
  cards: Card[];
}

export interface Contact {
  id: number;
  created: Date;
  modified: Date;
  active: boolean;
  number: string;
  email: string;
  observation: string;
  customer: number;
}

export interface Contacts {
  contacts: Contact[];
}

export interface Manager {
  id: number;
  created: Date;
  modified: Date;
  active: boolean;
  transaction_action: string;
  source: string;
  amount: number;
  account_balance: string;
  account: string;
}

export interface Managers {
	[x: string]: any;
  Managers: Manager[];
}

