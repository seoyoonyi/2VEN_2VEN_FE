import { useRef, useState } from 'react';

import { css } from '@emotion/react';
import { BiPlus } from 'react-icons/bi';

import ImgSection from '../ImgSection';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Toast from '@/components/common/Toast';
import useModalStore from '@/stores/modalStore';
import useToastStore from '@/stores/toastStore';
import theme from '@/styles/theme';
import { isValidCheckImg } from '@/utils/fileHelper';

interface imgFileDetail {
  imgUrl: string;
  name: string;
}

const paginatedData = (data: imgFileDetail[], currentPage: number, pageSize = 8) => {
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  return data.slice(startIdx, endIdx);
};

const AccountVerify = () => {
  const [fileNames, setFileNames] = useState<imgFileDetail[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const { openModal } = useModalStore();
  const { showToast, message, hideToast, isToastVisible } = useToastStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const limit = 8;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFiles = e.target.files;
    if (imgFiles) {
      const validFiles = Array.from(imgFiles).filter((file) => isValidCheckImg(file.name));

      if (validFiles.length > 0) {
        const newImgs = validFiles.map((file, idx) => ({
          id: `${file.name}-${idx}`,
          imgUrl: URL.createObjectURL(file),
          name: file.name,
        }));
        setFileNames((prevImgs) => [...prevImgs, ...newImgs]);
        e.target.value = '';
      } else {
        showToast('파일 이름은 날짜 형식이어야 하며, 올바른 이미지 형식이어야 합니다.');
      }
    }
  };

  const handleSelectedImg = (imgUrl: string, checked: boolean) => {
    setSelectedFiles((prevSelected) =>
      checked ? [...prevSelected, imgUrl] : prevSelected.filter((url) => url !== imgUrl)
    );
  };

  const handleDeleteImg = () => {
    openModal({
      type: 'warning',
      title: '이미지 삭제',
      desc: `선택하신 ${selectedFiles.length}개의 이미지를 삭제하시겠습니까?`,
      onAction: () => {
        setFileNames((prevImgs) => prevImgs.filter((img) => !selectedFiles.includes(img.imgUrl)));
        setSelectedFiles([]);
      },
    });
  };

  return (
    <div css={accountWrapper}>
      <div css={headingStyle}>
        <div css={textStyle}>
          파일 이름은 YYYY.MM.DD 형식(예: 2024.11.15)으로 일간분석 테이블에 입력한 날짜와 동일하게
          변경해주세요.
        </div>
        <div css={buttonArea}>
          <Button variant='accent' size='sm' width={89} onClick={handleUploadClick}>
            추가
            <BiPlus />
          </Button>
          <Button variant='neutral' size='sm' width={89} onClick={handleDeleteImg}>
            삭제
          </Button>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleUploadImg}
            style={{ display: 'none' }}
          />
        </div>
      </div>
      {fileNames.length > 0 ? (
        <div css={imagesGrid}>
          {paginatedData(fileNames, page, limit).map((item, idx) => (
            <ImgSection
              key={idx}
              img={item.imgUrl}
              name={item.name}
              isSelected={selectedFiles.includes(item.imgUrl)}
              onSelect={(checked) => handleSelectedImg(item.imgUrl, checked)}
            />
          ))}
        </div>
      ) : (
        <div css={noneUploaded}>
          업로드된 데이터가 없습니다. 데이터를 업로드해주세요.라는 느낌의 알림 디자인이 나오면 그 때
          바로 교체해두도록 하겠습니다.
        </div>
      )}

      <Pagination
        totalPage={Math.ceil(fileNames.length / limit)}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <Modal />
      <Toast message={message} onClose={hideToast} isVisible={isToastVisible} />
    </div>
  );
};

const accountWrapper = css`
  width: 940px;
  display: flex;
  flex-direction: column;
`;

const headingStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const textStyle = css`
  ${theme.textStyle.captions.caption2};
  color: ${theme.colors.gray[500]};
  flex-grow: 1;
`;
const buttonArea = css`
  display: flex;
  gap: 10px;
`;

const imagesGrid = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const noneUploaded = css`
  background-color: ${theme.colors.teal[50]};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export default AccountVerify;
