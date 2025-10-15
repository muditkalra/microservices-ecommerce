import { CartStoreActionsType, CartStoreStateType } from '@repo/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
    persist(
        (set) => ({
            cart: [],
            hasHyderated: false,
            addToCart: (product) => set((state) => {
                const existingIndex = state.cart.findIndex((p) => p.id == product.id && p.selectedColor == product.selectedColor && p.selectedSize == product.selectedSize);
                const updatedCart = [...state.cart];
                if (existingIndex !== -1 && updatedCart[existingIndex]) {
                    updatedCart[existingIndex].quantity += product.quantity || 1;
                    return { cart: updatedCart };
                }
                return { cart: [...state.cart, product] }
            }),
            removeFromCart: (product) => set((state) => ({ cart: state.cart.filter(p => !(p.id == product.id && p.selectedSize == product.selectedSize && p.selectedColor == product.selectedColor)) })),
            clearCart: () => set({ cart: [] })
        }),
        {
            name: 'cart',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.hasHyderated = true;
                }
            }
        }
    )
)

export default useCartStore
