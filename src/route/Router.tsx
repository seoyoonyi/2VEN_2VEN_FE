import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import RootLayout from '@/layouts/RootLayout';
import StockTypeListPage from '@/pages/admin/stock-type/StockTypeListPage';
import StrategyApprovalListPage from '@/pages/admin/strategy/StrategyApprovalListPage';
import TradingTypeListPage from '@/pages/admin/trading-type/TradingTypeListPage';
import AdminVerifyPage from '@/pages/auth/admin/AdminVerifyPage';
import EmailFoundPage from '@/pages/auth/find/EmailFoundPage';
import FindEmailPage from '@/pages/auth/find/FindEmailPage';
import FindPasswordPage from '@/pages/auth/find/FindPasswordPage';
import PasswordResetSuccessPage from '@/pages/auth/find/PasswordResetSuccessPage';
import ResetPasswordPage from '@/pages/auth/find/ResetPasswordPage';
import SignInPage from '@/pages/auth/SignInPage';
import SignUpFormPage from '@/pages/auth/signup/SignUpPage';
import SignUpSelectTypePage from '@/pages/auth/signup/SignUpSelectTypePage';
import SignUpSuccessPage from '@/pages/auth/signup/SignUpSuccessPage';
import WithdrawalSuccessPage from '@/pages/auth/WithdrawalSuccessPage';
import NotFoundPage from '@/pages/error/NotFoundPage';
import HomePage from '@/pages/HomePage';
import InvestorFollowFolderPage from '@/pages/mypage/investor/InvestorFollowFolderPage';
import InvestorMyPage from '@/pages/mypage/investor/InvestorMyPage';
import InvestorProfilePage from '@/pages/mypage/investor/InvestorProfilePage';
import MyInquiriesPage from '@/pages/mypage/investor/MyInquiriesPage';
import InquiriesManagementPage from '@/pages/mypage/trader/InquiriesManagementPage';
import StrategyCreatePage from '@/pages/mypage/trader/StrategyCreatePage';
import StrategyEditPage from '@/pages/mypage/trader/StrategyEditPage';
import TraderMyPage from '@/pages/mypage/trader/TraderMyPage';
import TraderProfilePage from '@/pages/mypage/trader/TraderProfilePage';
import SearchResultsInStrategy from '@/pages/search/SearchResultsInStrategy';
import SearchResultsInTrader from '@/pages/search/SearchResultsInTrader';
import SearchTotalResultsPage from '@/pages/search/SearchTotalResultsPage';
import InquiryPage from '@/pages/strategy/InquiryPage';
import StrategyDetailPage from '@/pages/strategy/StrategyDetailPage';
import StrategyListPage from '@/pages/strategy/StrategyListPage';
import TraderDetailPage from '@/pages/trader/TraderDetailPage';
import TraderListPage from '@/pages/trader/TraderListPage';

export const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME.PATH,
      element: <RootLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: ROUTES.HOME.PATH,
          element: <HomePage />, // 메인 홈 페이지
        },
        // -------------------------------------- 인증
        {
          path: ROUTES.AUTH.LOGIN,
          element: <SignInPage />, // 로그인 페이지
        },
        {
          path: ROUTES.AUTH.SIGNUP.SELECT_TYPE,
          element: <SignUpSelectTypePage />, // 회원가입 유형 선택 페이지
        },
        {
          path: ROUTES.AUTH.SIGNUP.FORM,
          element: <SignUpFormPage />, // 회원가입 폼 페이지
        },
        {
          path: ROUTES.AUTH.SIGNUP.SUCCESS,
          element: <SignUpSuccessPage />, // 회원가입 성공 페이지
        },
        {
          path: ROUTES.AUTH.ADMIN.VERIFY,
          element: <AdminVerifyPage />, // 관리자 인증 페이지
        },
        {
          path: ROUTES.AUTH.WITHDRAWAL.SUCCESS,
          element: <WithdrawalSuccessPage />, // 회원탈퇴 성공 페이지
        },
        // -------------------------------------- 찾기/재설정
        {
          path: ROUTES.AUTH.FIND.EMAIL,
          element: <FindEmailPage />, // 이메일 찾기 페이지
        },
        {
          path: ROUTES.AUTH.FIND.EMAIL_SUCCESS,
          element: <EmailFoundPage />, // 이메일 찾기 성공 페이지
        },
        {
          path: ROUTES.AUTH.FIND.PASSWORD,
          element: <FindPasswordPage />, // 비밀번호 찾기 페이지
        },
        {
          path: ROUTES.AUTH.FIND.PASSWORD_RESET,
          element: <ResetPasswordPage />, // 비밀번호 재설정 페이지
        },
        {
          path: ROUTES.AUTH.FIND.PASSWORD_RESET_SUCCESS,
          element: <PasswordResetSuccessPage />, // 비밀번호 재설정 성공 페이지
        },
        // -------------------------------------- 전략
        {
          path: ROUTES.STRATEGY.LIST,
          element: <StrategyListPage />, // 전략 목록 페이지
        },
        {
          path: ROUTES.STRATEGY.DETAIL(':strategyId'),
          element: <StrategyDetailPage />, // 전략 상세 페이지
        },
        {
          path: ROUTES.STRATEGY.INQUIRIES,
          element: <InquiryPage />, // 전략 문의 페이지
        },
        // -------------------------------------- 트레이더
        {
          path: ROUTES.TRADER.LIST,
          element: <TraderListPage />, // 트레이더 목록 페이지
        },
        {
          path: ROUTES.TRADER.PROFILE(':traderId'),
          element: <TraderDetailPage />, // 트레이더 프로필 상세 페이지
        },
        // -------------------------------------- 마이페이지(투자자)
        {
          path: ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS,
          element: <InvestorMyPage />, // 투자자 마이페이지 - 관심전략 폴더 목록
        },
        {
          path: ROUTES.MYPAGE.INVESTOR.FOLLOWING.STRATEGIES(':folderId'),
          element: <InvestorFollowFolderPage />, // 특정 폴더의 관심전략 목록
        },
        {
          path: ROUTES.MYPAGE.INVESTOR.MYINQUIRY,
          element: <MyInquiriesPage />, // 나의 상담 게시판
        },
        {
          path: ROUTES.MYPAGE.INVESTOR.PROFILE,
          element: <InvestorProfilePage />, // 투자자 프로필 관리
        },
        // -------------------------------------- 마이페이지(트레이더)
        {
          path: ROUTES.MYPAGE.TRADER.STRATEGIES.LIST,
          element: <TraderMyPage />, // 트레이더 마이페이지 - 나의 전략 리스트
        },
        {
          path: ROUTES.MYPAGE.TRADER.STRATEGIES.CREATE,
          element: <StrategyCreatePage />, // 전략 등록 페이지
        },
        {
          path: ROUTES.MYPAGE.TRADER.STRATEGIES.EDIT(':strategyId'),
          element: <StrategyEditPage />, // 전략 수정 페이지
        },
        {
          path: ROUTES.MYPAGE.TRADER.INQUIRIES,
          element: <InquiriesManagementPage />, // 문의 관리 페이지
        },
        {
          path: ROUTES.MYPAGE.TRADER.PROFILE,
          element: <TraderProfilePage />, // 트레이더 프로필 관리
        },
        // -------------------------------------- 검색
        {
          path: ROUTES.SEARCH.ROOT.WITH_KEYWORD(':keyword'),
          element: <SearchTotalResultsPage />, // 통합검색결과 페이지(전략과 트레이더 검색결과)
        },
        {
          path: ROUTES.SEARCH.TRADER.WITH_KEYWORD(':keyword'),
          element: <SearchResultsInTrader />, // 트레이더 내 검색결과 페이지
        },
        {
          path: ROUTES.SEARCH.STRATEGY.WITH_KEYWORD(':keyword'),
          element: <SearchResultsInStrategy />, // 전략 내 검색결과 페이지
        },
        // -------------------------------------- 관리자

        {
          path: ROUTES.ADMIN.STOCK_TYPE.LIST,
          element: <StockTypeListPage />, // 상품유형 관리 페이지(현재 대시보드 페이지)
        },
        {
          path: ROUTES.ADMIN.TRADING_TYPE.LIST,
          element: <TradingTypeListPage />, // 매매유형 관리 페이지
        },
        {
          path: ROUTES.ADMIN.STRATEGY.APPROVAL,
          element: <StrategyApprovalListPage />, // 전략 승인 관리 페이지
        },
      ],
    },
    {
      // 404 및 기타 리다이렉트 처리
      path: ROUTES.ERROR.NOT_FOUND,
      element: <NotFoundPage />, // 404 Not Found 페이지
    },
    {
      // 유효하지 않은 경로로 접근했을 때 404 페이지로 리다이렉트
      path: '*',
      element: <Navigate to={ROUTES.ERROR.NOT_FOUND} replace />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
