import { apiClient } from './client';

export const maintenanceApi = {
  getTickets: async (studentId?: string) => {
    return apiClient.get<{ docs: any[] }>(`/students/maintenance`);
  },

  createTicket: async (payload: { title: string; description: string; priority: string; reported_by?: string }) => {
    return apiClient.post<{ doc: any }>('/students/maintenance', payload);
  }
};
