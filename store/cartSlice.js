import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const existingItem = state.items.find(item => item.menuId === action.payload.menuId);
            if (existingItem) {
                existingItem.quantity += 1; // 이미 있으면 수량 증가
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); // 새로 추가
            }
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.menuId === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.menuId === action.payload);
            if (item) {
                if (item.quantity === 1) {
                    state.items = state.items.filter(item => item.menuId !== action.payload); // 수량 1이면 삭제
                } else {
                    item.quantity -= 1;
                }
            }
        },
        clearCart: (state) => {
            state.items = []; // 장바구니 초기화
        }
    },
});

export const { addItemToCart, increaseQuantity, decreaseQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;