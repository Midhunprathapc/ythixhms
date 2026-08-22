import { apiClient } from './client';

export const studentPortalApi = {
  getDashboardData: async () => {
    return apiClient.get<{
      student: any;
      activeTenancy: any;
      announcements: any[];
      events: any[];
      maintenanceTicketsCount: number;
    }>('/students/dashboard');
  }
};
