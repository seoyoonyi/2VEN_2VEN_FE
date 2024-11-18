import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// TODO: 요청 인터셉터 구현
// - 요청 URL과 메서드 로깅 (디버깅용)
// - Authorization 헤더에 로그인 토큰 추가 (localStorage or sessionStorage에서 가져오기)

// TODO: 응답 인터셉터 구현
// - 응답 데이터를 호출부에서 쉽게 처리할 수 있도록 변환
// - 상태 코드 기반 에러 처리 추가 (401 Unauthorized, 404 Not Found 등)
