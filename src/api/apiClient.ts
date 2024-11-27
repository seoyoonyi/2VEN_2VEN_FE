import axios from 'axios';

import { useAuthStore } from '@/stores/authStore';

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS with Credentials 설정
});

apiClient.interceptors.request.use(
  (config) => {
    // store에서 jwt 토큰 가져오기
    const { token } = useAuthStore.getState();

    // 요청 URL과 메서드 로깅(개발환경에서만!)
    if (import.meta.env.MODE === 'development') {
      console.group('[API Request]');
      console.log('URL:', `${config.method?.toUpperCase()} ${config.url}`);
      console.log('Headers:', config.headers);
      console.log('Body:', config.data);
      console.groupEnd();
    }

    // JWT 토큰이 있으면, Authorization 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      if (import.meta.env.MODE === 'development') {
        console.log('Final Headers with Token:', config.headers);
      }
    }

    // MSW 사용 여부에 따라 useMock 헤더 추가
    if (config.headers.useMock) {
      config.baseURL = '';
      delete config.headers.useMock;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    // 성공 응답도 로깅
    if (import.meta.env.MODE === 'development') {
      console.group('[API Response]');
      console.log('Status:', response.status);
      console.log('Data:', response.data);
      console.groupEnd();
    }
    return response;
  },
  (error) => {
    // 오타 수정: error.responxe -> error.response
    if (error.response) {
      // 수정됨
      const { status, data } = error.response;

      // 에러 응답 로깅 추가
      if (import.meta.env.MODE === 'development') {
        console.group('[API Error]');
        console.log('Status:', status);
        console.log('Data:', data);
        console.groupEnd();
      }

      switch (status) {
        case 400: {
          console.error('잘못된 요청입니다:', data);
          break;
        }
        case 401: {
          console.error('인증 에러:', data);
          useAuthStore.getState().signout();
          break;
        }
        case 403: {
          console.error('접근 권한이 없습니다:', data);
          break;
        }
        case 404: {
          console.error('요청한 리소스를 찾을 수 없습니다:', data);
          break;
        }
        case 500: {
          console.error('서버 에러입니다:', data);
          break;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
