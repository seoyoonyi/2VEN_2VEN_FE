import { create } from 'zustand';

interface ContentModalData {
  title: string;
  content: React.ReactNode;
  onAction: () => void;
}

interface ModalStore {
  isOpen: boolean;
  contentModalData: ContentModalData | null;
  openModal: (data: ContentModalData) => void;
  closeModal: () => void;
}

const useContentModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  contentModalData: null,
  openModal: (data: ContentModalData) => set({ isOpen: true, contentModalData: data }),
  closeModal: () => set({ isOpen: false, contentModalData: null }),
}));

export default useContentModalStore;
