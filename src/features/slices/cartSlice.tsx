
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [
        {
            quantity: 2,
            product: { id: 1, title: "tulonun iphone u 14 promax", description: "desc", price: 155, category: "phone" }
        }
    ]
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let product = state.cartItems.find(c => c.product.id === action.payload.id);
            if (product) {
                product.quantity++;
            } else {
                state.cartItems = [...state.cartItems, {quantity : 1, product : action.payload}]
            }
        },
        removeFromCart: (state, action) => {
            console.log(action.payload)
            state.cartItems = state.cartItems.filter(c => c.product.id !== action.payload.id);
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
