import { create } from 'zustand';

export type AppView =
  | 'home'
  | 'products'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'weather'
  | 'crops'
  | 'crop-detail'
  | 'chatbot'
  | 'price-comparison'
  | 'shop-location'
  | 'my-account'
  | 'order-success'
  | 'refund';

interface AppStore {
  currentView: AppView;
  selectedProductId: string | null;
  selectedCropId: string | null;
  searchQuery: string;
  selectedCategory: string;
  selectedOrderId: string | null;
  navigate: (view: AppView) => void;
  setSelectedProduct: (id: string | null) => void;
  setSelectedCrop: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedOrderId: (id: string | null) => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  currentView: 'home',
  selectedProductId: null,
  selectedCropId: null,
  searchQuery: '',
  selectedCategory: 'all',
  selectedOrderId: null,

  navigate: (view) => {
    set({ currentView: view });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  setSelectedProduct: (id) => set({ selectedProductId: id }),
  setSelectedCrop: (id) => set({ selectedCropId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedOrderId: (id) => set({ selectedOrderId: id }),
}));
