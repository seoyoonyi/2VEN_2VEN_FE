import { http, HttpResponse } from 'msw';

interface SignUpRequest {
  email: string;
  password: string;
  username: string;
}

// 응답성공메세지, 사용자정보
interface SignUpResponse {
  message: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export const authHandlers = [
  // 회원가입 요청의 body를 파싱(회원가입 핸들러 로직)
  http.post('/api/signup', async ({ request }) => {
    const body = (await request.json()) as SignUpRequest;

    // 이메일 중복 체크 시뮬레이션
    if (body.email === 'existing@example.com') {
      return new HttpResponse(JSON.stringify({ message: '이미 존재하는 이메일입니다.' }), {
        status: 400,
      });
    }

    // 세션 기반 회원가입 성공 응답
    const response: SignUpResponse = {
      message: '회원가입이 완료되었습니다.',
      user: {
        id: 1,
        email: body.email,
        username: body.username,
      },
    };

    return HttpResponse.json(response, {
      status: 201,
      // 세션 쿠키 설정(백엔드에서 설정한 세션 쿠키)
      headers: {
        'Set-Cookie': 'JSESSIONID=mock-session-id; Path=/; HttpOnly; Secure',
      },
    });
  }),

  // http.post('/api/login', async ({ request }) => {
  //   // 로그인 핸들러 로직
  // }),
  // http.post('/api/logout', () => {
  //   // 로그아웃 핸들러 로직
  // }),
];
