import { create } from "zustand";

type CartStore = {
  cart: Map<number, number>;
  addToCart: (item: number) => void;
  removeFromCart: (item: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: new Map<number, number>(),
  addToCart: (item) => {
    set((state) => {
      if (state.cart.has(item)) {
        const prevItem = state.cart.get(item);
        if (!prevItem) return { cart: state.cart };
        state.cart.set(item, prevItem + 1);
      } else {
        state.cart.set(item, 1);
      }
      return { cart: new Map(state.cart) };
    });
  },
  removeFromCart: (item) => {
    set((state) => {
      if (state.cart.has(item)) {
        if (state.cart.get(item) === 1) state.cart.delete(item);
        else {
          const prevItem = state.cart.get(item);
          if (!prevItem) return { cart: state.cart };
          state.cart.set(item, prevItem - 1);
        }
      }
      return { cart: new Map(state.cart) };
    });
  },
}));
