import { apiClient } from './client';

export interface OTPResponse {
  success: boolean;
  message: string;
  token?: string;
}

export const authApi = {
  requestOTP: async (phone: string): Promise<OTPResponse> => {
    return apiClient.post<OTPResponse>('/students/request-otp', { phone });
  },
  
  verifyOTP: async (phone: string, code: string): Promise<OTPResponse> => {
    return apiClient.post<OTPResponse>('/students/verify-otp', { phone, code });
  },
  
  getCurrentStudent: async () => {
    return apiClient.get<{ user: any }>('/students/me');
  }
};
