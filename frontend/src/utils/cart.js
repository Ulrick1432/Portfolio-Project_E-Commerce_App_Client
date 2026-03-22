/**
 * Cart Redux Slice
 * 
 * Manages client-side shopping cart state using Redux Toolkit.
 * Provides a centralized store for cart items across the application.
 * 
 * Purpose:
 *   - Stores array of product IDs representing items in the cart
 *   - Enables reactive UI updates when cart changes
 *   - Shares cart state between components without prop drilling
 * 
 * Data Flow:
 *   - Cart items are added/updated via API calls (server-side session)
 *   - Redux store mirrors the server state for fast UI access
 *   - Components read from Redux instead of making repeated API calls
 * 
 * State Shape:
 *   {
 *     cart: {
 *       value: number[] | null  // Array of product IDs, null initially
 *     }
 *   }
 * 
 * Example State:
 *   {
 *     cart: {
 *       value: [1, 2, 2, 3]  // Product 1, two of product 2, product 3
 *     }
 *   }
 * 
 * @module utils/cart
 * @see {@link https://redux.js.org/tutorials/quick-start} Redux Quick Start Guide
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * Cart slice configuration.
 * 
 * Creates a Redux slice with:
 *   - name: 'cart' - identifies this slice in the Redux store
 *   - initialState: { value: null } - cart starts empty (null, not [])
 *   - reducers: actions to update cart state
 */
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    /**
     * Cart items stored as array of product IDs.
     * 
     * - null: Cart not yet initialized (initial state)
     * - []: Empty cart (no items)
     * - [1, 2, 3]: Products with IDs 1, 2, and 3
     * 
     * Note: Duplicate IDs represent quantity (e.g., [1, 1] = 2x product 1)
     */
    value: null
  },
  reducers: {
    /**
     * Updates the entire cart state with a new array of product IDs.
     * 
     * @param {Object} state - Current Redux state (mutable via Immer)
     * @param {Object} action - Redux action with payload
     * @param {number[]} action.payload - Array of product IDs for the cart
     * 
     * @example
     * // Dispatch to set cart with products 1, 2, and 3
     * dispatch(cartState([1, 2, 3]));
     * 
     * @example
     * // Dispatch to add product 5 to existing cart
     * const currentCart = useSelector(state => state.cartState.value);
     * dispatch(cartState([...currentCart, 5]));
     */
    cartState: (state, action) => {
      state.value = action.payload;
    }
  }
});

/**
 * Cart state update action.
 * Use this action to update the cart in the Redux store.
 * 
 * @example
 * import { cartState } from '../utils/cart';
 * dispatch(cartState([1, 2, 3]));
 */
export const { cartState } = cartSlice.actions;

/**
 * Cart slice reducer.
 * Combine this with other reducers in the Redux store configuration.
 * 
 * @example
 * // In store.js
 * import cartReducer from '../utils/cart';
 * export default combineReducers({
 *   cartState: cartReducer,
 *   // ... other reducers
 * });
 */
export default cartSlice.reducer;
