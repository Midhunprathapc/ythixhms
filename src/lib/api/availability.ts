import { apiClient } from './client';
import { RoomData } from '@/components/booking/BedSelector';

export const availabilityApi = {
  checkAvailability: async (propertyId: string) => {
    return apiClient.get<{ rooms: RoomData[] }>(`/availability?propertyId=${propertyId}`);
  }
};
