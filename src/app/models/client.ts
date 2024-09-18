export interface CreateClientViewModel {
  name: string;
  birthDate: Date;
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
  type: string; // e.g., Comercial, Residencial
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;  
}
