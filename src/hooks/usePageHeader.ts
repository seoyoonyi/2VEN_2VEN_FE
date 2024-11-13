import { useLocation, useMatch } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

export const usePageHeader = () => {
  const location = useLocation();

  const headerContent = {
    [ROUTES.MYPAGE.TRADER.STRATEGIES.CREATE]: {
      title: '전략등록',
      desc: '등록한 전략은 3일간 매매 일지 입력을 완료한 후 관리자의 승인을 받게 되며,\n이후 공개여부 설정에 따라 전략 목록에 표시됩니다.',
    },
    [ROUTES.STRATEGY.LIST]: {
      title: '전략랭킹',
      desc: '전략의 랭킹을 확인할 수 있는 페이지입니다.',
    },
  };

  const currentHeader = useMatch(ROUTES.MYPAGE.TRADER.STRATEGIES.EDIT(':strategyId'))
    ? { title: '전략수정', desc: '등록된 전략을 수정하는 페이지입니다.' }
    : headerContent[location.pathname as keyof typeof headerContent] || null;

  return currentHeader;
};
