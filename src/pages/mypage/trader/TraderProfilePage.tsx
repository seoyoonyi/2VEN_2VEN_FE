import LineChart from '@/components/common/LineChart';

const TraderProfilePage = () => {
  const exampleData = [20, 40, 50, 60, 70, 50, 80, 72, 87, 90, 100, 23];
  const exampleData2 = [20, 40, 40, 60, 70, 50, 90, 100, 100, 60, 40, 23];
  return (
    <div>
      <h1>프로필 관리</h1>
      메인에 들어갈 SMScore 차트
      <LineChart data={exampleData} size='md' colorTheme='secondary' />
      목록에 들어갈 SMScore차트
      <LineChart data={exampleData2} size='sm' colorTheme='primary' />
    </div>
  );
};

export default TraderProfilePage;
