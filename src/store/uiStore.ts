import { create } from 'zustand';

interface UIState {
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isContactModalOpen: false,
  openContactModal: () => set({ isContactModalOpen: true }),
  closeContactModal: () => set({ isContactModalOpen: false }),
}));
