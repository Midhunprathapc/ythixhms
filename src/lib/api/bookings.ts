import { apiClient } from './client';

export interface BookingPayload {
  property: string;
  room?: string;
  bed?: string;
  check_in_date: string;
  check_out_date: string;
  status: string;
  personal_info: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export const bookingsApi = {
  createBooking: async (payload: BookingPayload) => {
    return apiClient.post<{ doc: any }>('/bookings', payload);
  },
  
  getBooking: async (id: string) => {
    return apiClient.get<{ doc: any }>(`/bookings/${id}`);
  }
};
