import { http, HttpResponse } from 'msw';

import { API_ENDPOINTS } from '@/api/apiEndpoints';
import { SigninRequest } from '@/types/auth';

// 로그인 요청에 대한 핸들러
const MOCK_USER = [
  {
    member_id: 1,
    email: 'investor@example.com',
    password: 'Password1!',
    nickname: '투자자',
    role: 'INVESTOR',
  },
  {
    member_id: 2,
    email: 'trader@example.com',
    password: 'Password1!',
    nickname: '트레이더',
    role: 'TRADER',
  },
  {
    member_id: 3,
    email: 'admin@example.com',
    password: 'Password1!',
    nickname: '관리자',
    role: 'ADMIN',
  },
];

// 전화번호로 이메일 찾기 요청에 대한 핸들러
const MOCK_USER_WITH_PHONE = [
  {
    member_id: 1,
    email: 'investor@example.com',
    password: 'Password1!',
    nickname: '투자자',
    role: 'INVESTOR',
    phone: '01012345678',
  },
  {
    member_id: 2,
    email: 'trader@example.com',
    password: 'Password1!',
    nickname: '트레이더',
    role: 'TRADER',
    phone: '01087654321',
  },
];

export const signinHandler = [
  // 실제 API: POST /api/members/login
  http.post(API_ENDPOINTS.AUTH.LOGIN, async ({ request }) => {
    console.log('MSW: Login request intercepted');
    // 실제 API와 구분하기 위해 경로 변경
    const { email, password } = (await request.json()) as SigninRequest;
    console.log('MSW: 로그인 요청 받음', { email, password }); // 요청 로깅

    const user = MOCK_USER.find((user) => user.email === email);
    if (!user || user.password !== password) {
      console.log('MSW: 인증 실패'); // 실패 로깅
      return HttpResponse.json(
        {
          status: 'error',
          error: '이메일 또는 비밀번호가 올바르지 않습니다.',
        },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;
    console.log('MSW: 인증 성공', userWithoutPassword); // 성공 로깅

    return HttpResponse.json({
      status: 'success',
      data: {
        token: `mock-jwt-token-${user.role.toLowerCase()}`,
        user: userWithoutPassword,
      },
    });
  }),
];

interface FindEmailRequest {
  phone: string;
}

export const findEmailHandler = [
  http.post(API_ENDPOINTS.AUTH.FIND.EMAIL, async ({ request }) => {
    console.log('MSW: Find Email request intercepted at', API_ENDPOINTS.AUTH.FIND.EMAIL);
    const { phone } = (await request.json()) as FindEmailRequest;
    console.log('Received phone:', phone);

    const user = MOCK_USER_WITH_PHONE.find((user) => user.phone === phone);

    if (!user) {
      return HttpResponse.json(
        {
          status: 'error',
          error: '해당 전화번호로 등록된 계정을 찾을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      status: 'success',
      data: { email: user.email },
    });
  }),
];
