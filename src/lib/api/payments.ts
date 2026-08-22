import { apiClient } from './client';

export const paymentsApi = {
  getStudentPayments: async (studentId?: string) => {
    return apiClient.get<{ docs: any[] }>(`/students/invoices`);
  }
};
