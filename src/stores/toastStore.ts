import { create } from 'zustand';

interface ToastButton {
  label: string; // 버튼에 표시될 텍스트
  onClick: () => void; // 버튼 클릭 시 동작
}

interface ToastData {
  isToastVisible: boolean;
  message: string;
  buttons: ToastButton[]; // 버튼 배열로 타입 지정
  type: 'basic' | 'action' | 'error';
  showToast: (
    message: string,
    type?: 'basic' | 'action' | 'error',
    buttons?: ToastButton[] // showToast에 buttons 매개변수 추가
  ) => void;
  hideToast: () => void;
}

const useToastStore = create<ToastData>((set) => ({
  isToastVisible: false,
  message: '',
  type: 'basic',
  buttons: [], // 초기값은 빈 배열
  showToast: (message, type = 'basic', buttons = []) =>
    set({ isToastVisible: true, message, type, buttons }), // 전달된 buttons로 상태 설정
  hideToast: () => set({ isToastVisible: false, message: '', type: 'basic', buttons: [] }), // 상태 초기화
}));

export default useToastStore;
