export interface ClientViewModel {
  id: number;
  name: string;
  birthDate: Date;
  gender: string | undefined;
}

export interface AddressViewModel {
  id: number;
  street: string;
  city: string;
}
