// usePages.js
import { create } from 'zustand';

const storedCart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) || [] : [];



export const useProductStore = create((set, get) => ({
  products: [],
  cartProducts: storedCart,
  sizeGroup: 9,
  currentPage: 1,
  filter: {
    category: null,
    species: null,
    brand: null,
  },
  dataId: {
    category: '',
    species: '',
    brand: '',
  },
  originalProducts: [],

  getTotalPages: () => {
    const { products, sizeGroup } = get();
    return Math.ceil(products.length / sizeGroup);
  },

  setFilter: (fill) =>
    set((state) => ({
      filter: {
        ...state.filter,
        [fill.name]: fill.value,
      },
    })),

  getFilter: () => {
    const { filter } = get();
    return filter;
  },

  setProducts: (products) => set({ products }),

  getProducts: () => {
    const { products } = get();
    return products;
  },

  setSizeGroup: (num) => set({ sizeGroup: num }),

  setCurrentPage: (page) => {
    const totalPages = get().getTotalPages();
    if (page - 1 <= totalPages && page - 1 >= 0) {
      set({ currentPage: page });
    }
  },

  getArrayPage: () => {
    const { products, sizeGroup, currentPage } = get();
    const currentPageIndex = currentPage - 1;
    const startIndex = currentPageIndex * sizeGroup;
    const endIndex = startIndex + sizeGroup;
    return products.slice(startIndex, endIndex);
  },

  getCurrentPage: () => {
    const { currentPage } = get();
    return currentPage;
  },

  setOriginalProducts: (products) => set({ originalProducts: [...products] }),

  resetFilters: () => set((state) => ({
    filter: {
      category: null,
      species: null,
      brand: null,
    },
  })),
  
  addToCart: (product) => {
    set((state) => {
      const existingProduct = state.cartProducts.find((p) => p.id === product.id);
  
      if (existingProduct) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        const updatedCart = state.cartProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return { cartProducts: updatedCart };
      } else {
        // Si el producto no está en el carrito, agrégalo con cantidad 1
        const updatedCart = [...state.cartProducts, { ...product, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return { cartProducts: updatedCart };
      }
    });
  },
  
  removeFromCart: (products) => {
    set((state) => {
      const updatedCart = state.cartProducts.filter((p) => p.id !== products.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cartProducts: updatedCart };
    });
  },

  updateQuantity: (products, newQuantity) => {
    set((state) => {
      const updatedCart = state.cartProducts.map((p) =>
        p.id === products.id ? { ...p, quantity: newQuantity } : p
      );
      return { cartProducts: updatedCart };
    });
  },

}));

export const useOriginalProducts = () => {
  const originalProducts = useProductStore((state) => state.originalProducts);
  return originalProducts;
};

export const useCurrentPage = () => {
  const currentPage = useProductStore((state) => state.currentPage);
  return currentPage;
};
