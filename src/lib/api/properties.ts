import { apiClient } from './client';

export interface Property {
  id: string;
  name: string;
  address?: string;
  country?: string;
  city?: string;
  description?: any;
  amenities?: { name: string }[];
  rules?: any;
  checkin_time?: string;
  checkout_time?: string;
  minimum_stay?: number;
  maximum_stay?: number;
  gender_policy?: string;
  currency?: string;
}

export const propertiesApi = {
  getProperties: async () => {
    return apiClient.get<{ docs: Property[] }>('/properties?where[public_visibility][equals]=true');
  },
  
  getPropertyById: async (id: string) => {
    return apiClient.get<Property>(`/properties/${id}`);
  },
};
