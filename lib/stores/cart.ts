import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductVariant } from '@/lib/schemas/product';

interface CartItem {
  variantId: string;
  quantity: number;
  variant: ProductVariant;
}

interface CartStore {
  items: CartItem[];
  addItem: (variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (variant: ProductVariant, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.variantId === variant.id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.variantId === variant.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { variantId: variant.id, variant, quantity }],
          };
        });
      },

      removeItem: (variantId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId: string, quantity: number) => {
        if (quantity < 1) {
          get().removeItem(variantId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      get itemCount() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      get total() {
        return get().items.reduce((total, item) => total + item.variant.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
