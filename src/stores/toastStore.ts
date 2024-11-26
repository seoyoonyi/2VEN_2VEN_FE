import { create } from 'zustand';

interface ToastData {
  isToastVisible: boolean;
  message: string;
  showToast: (message: string) => void;
  hideToast: () => void;
}

const useToastStore = create<ToastData>((set) => ({
  isToastVisible: false,
  message: '',

  showToast: (message) => set({ isToastVisible: true, message }),
  hideToast: () => {
    set({ isToastVisible: false, message: '' });
  },
}));

export default useToastStore;
