import APITestPage from '@/pages/test-page/APITestPage';
import MswTestPage from '@/pages/test-page/MockTestPage';

const TraderMyPage = () => (
  <div>
    <h1>나의 전략 리스트</h1>
    <p>트레이더가 마이페이지로 이동했을 때 나타나는 페이지입니다.</p>
    <MswTestPage />
    <APITestPage />
  </div>
);

export default TraderMyPage;
