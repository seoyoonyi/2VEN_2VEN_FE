import axios from 'axios';

import { useAuthStore } from '@/stores/authStore';

export const apiClient = axios.create();

// TODO: MSW와 실제 API를 구분하기 위한 baseURL 설정(api 다 나오면 이걸로 변경..)
// export const API_BASE_URL =
//   import.meta.env.VITE_ENABLE_MSW === 'true'
//     ? '' // MSW 사용 시 빈 문자열
//     : import.meta.env.VITE_BASE_URL;

// export const apiClient = axios.create({
//   baseURL: API_BASE_URL,
// });

// TODO: 요청 인터셉터 구현
// - 요청 URL과 메서드 로깅 (디버깅용)
// - 엔드포인트 요청 시 헤더에 useMock:true추가 --> msw 데이터 , 추가 안하면 리얼 api
// - Authorization 헤더에 로그인 토큰 추가 (localStorage or sessionStorage에서 가져오기)

apiClient.interceptors.request.use((config) => {
  if (config.headers.useMock) {
    config.baseURL = '';
    delete config.headers.useMock;
  } else {
    config.baseURL = import.meta.env.VITE_BASE_URL;
  }
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// TODO: 응답 인터셉터 구현
// - 응답 데이터를 호출부에서 쉽게 처리할 수 있도록 변환
// - 상태 코드 기반 에러 처리 추가 (401 Unauthorized, 404 Not Found 등)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[Response Error]', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
