export type RegistrationStatus = 'Onboarded' | 'Rejected' | '-';
export type VendorType = 'Independent' | 'Company';
export type ServiceOffering = 'Housekeeping' | 'Window Cleaning' | 'Car Valet';

export interface Vendor {
  id: string;
  email: string;
  phoneNumber: string;
  postcode: string;
  vendorType: VendorType;
  serviceOffering: ServiceOffering;
  signupDate: string;
  status: RegistrationStatus;
}

export interface FilterState {
  postcode: string;
  registrationStatus: RegistrationStatus | '';
  dateStart: string;
  dateEnd: string;
  vendorType: VendorType | '';
  serviceOffering: ServiceOffering | '';
  searchQuery: string;
}