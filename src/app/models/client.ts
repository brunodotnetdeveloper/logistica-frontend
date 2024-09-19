export interface CreateClientViewModel {
  name: string | undefined;
  birthDate: string | undefined;
  gender: string | undefined;
  addresses: AddressViewModel[];
}

export interface ClientViewModel extends CreateClientViewModel{
  id: number;
  active: boolean;
  // name: string;
  // birthDate: Date;
  // gender: string | undefined;  
  // addresses: AddressViewModel[]; 
}

export interface AddressViewModel {
  id: number;
  clientId: number;
  type: string; // e.g., Comercial, Residencial
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string; 
  complement: string;
}
