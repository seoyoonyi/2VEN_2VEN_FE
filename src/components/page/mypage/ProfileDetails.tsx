import { useEffect, useState } from 'react';

import { fetchPersonalDetails, updatePersonalDetails } from '@/api/profile'; // API 호출 함수 임포트

const ProfileDetails = () => {
  const [profile, setProfile] = useState({
    profilePath: '',
    email: '',
    nickname: '',
    phoneNumber: '',
    introduction: '',
    marketingOptional: false, // 명확한 초기값
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null); // 수정 상태 메시지

  const fetchProfileDetails = async () => {
    try {
      const profileData = await fetchPersonalDetails(); // API 호출
      setProfile(profileData); // 프로필 데이터 저장
    } catch (err) {
      setError('개인정보를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDetails = async () => {
    if (!profile) return;

    try {
      // 수정할 데이터
      const payload = {
        nickname: profile.nickname || '',
        phoneNumber: profile.phoneNumber || '',
        introduction: profile.introduction || '',
        marketingOptional: profile.marketingOptional || false,
      };

      await updatePersonalDetails(payload); // 수정 API 호출
      setUpdateStatus('회원정보가 성공적으로 수정되었습니다.');
    } catch (err) {
      console.log('수정 실패');
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!profile) return <div>프로필 정보를 불러올 수 없습니다.</div>;

  return (
    <div>
      <h1>프로필 상세 정보</h1>
      <img src={profile.profilePath || 'default_avatar.png'} alt='프로필 이미지' />
      <p>
        이메일: <input type='text' value={profile.email} disabled />
      </p>
      <p>
        닉네임:{' '}
        <input
          type='text'
          value={profile.nickname}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onChange={(e) => setProfile((prev) => ({ ...prev!, nickname: e.target.value }))}
        />
      </p>
      <p>
        전화번호:{' '}
        <input
          type='text'
          value={profile.phoneNumber}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onChange={(e) => setProfile((prev) => ({ ...prev!, phoneNumber: e.target.value }))}
        />
      </p>
      <p>
        소개:{' '}
        <textarea
          value={profile.introduction}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onChange={(e) => setProfile((prev) => ({ ...prev!, introduction: e.target.value }))}
        />
      </p>
      <p>
        마케팅 수신 동의:{' '}
        <input
          type='checkbox'
          checked={profile.marketingOptional}
          onChange={(e) =>
            setProfile((prev) => ({
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              ...prev!,
              marketingOptional: e.target.checked,
            }))
          }
        />
      </p>
      <button onClick={handleUpdateDetails}>수정</button>
      {updateStatus && <p>{updateStatus}</p>}
    </div>
  );
};

export default ProfileDetails;
