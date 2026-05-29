import { create } from 'zustand';
import type { CartItem } from '../types/sales.types';

interface CartStore {
  items: CartItem[];
  total: number;
  itemCount: number;
  customerId: string | null;
  addItem: (item: Omit<CartItem, 'quantity' | 'discountAmount' | 'subtotal'>) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  setCustomerId: (customerId: string | null) => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  itemCount: 0,
  customerId: null,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.variantId === item.variantId);

      let items: CartItem[] = [];

      if (existing) {
        items = state.items.map((i) => {
          if (i.variantId !== item.variantId) return i;

          const nextQuantity = Math.min(i.quantity + 1, i.stock);

          return {
            ...i,
            quantity: nextQuantity,
            subtotal: nextQuantity * i.unitPrice - i.discountAmount,
          };
        });
      } else {
        const quantity = item.stock > 0 ? 1 : 0;

        if (quantity === 0) {
          return state;
        }

        items = [
          ...state.items,
          {
            ...item,
            quantity,
            discountAmount: 0,
            subtotal: item.unitPrice * quantity,
          },
        ];
      }

      const total = items.reduce((sum, i) => sum + i.subtotal, 0);
      const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

      return { items, total, itemCount };
    }),

  removeItem: (variantId) =>
    set((state) => {
      const items = state.items.filter((i) => i.variantId !== variantId);
      const total = items.reduce((sum, i) => sum + i.subtotal, 0);
      const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

      return { items, total, itemCount };
    }),

  updateQuantity: (variantId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        const items = state.items.filter((i) => i.variantId !== variantId);
        const total = items.reduce((sum, i) => sum + i.subtotal, 0);
        const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
        return { items, total, itemCount };
      }

      const items = state.items.map((i) => {
        if (i.variantId !== variantId) return i;

        const nextQuantity = Math.min(quantity, i.stock);

        return {
          ...i,
          quantity: nextQuantity,
          subtotal: nextQuantity * i.unitPrice - i.discountAmount,
        };
      });

      const total = items.reduce((sum, i) => sum + i.subtotal, 0);
      const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

      return { items, total, itemCount };
    }),

  clearCart: () => ({ items: [], total: 0, itemCount: 0, customerId: null }),

  setCustomerId: (customerId) => set({ customerId }),

  getTotal: () => get().total,
}));