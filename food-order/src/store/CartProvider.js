import CartContext from './cart-context'
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const contextReducer = (state, action) => {
    console.log("ACTION: ", action)
    if(action.type === 'ADD') {
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount
        //check the existence of an item in the cart.
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingCartItem = state.items[existingItemIndex]
        let updatedItems;
        if (existingItemIndex) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item)
        }
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }
        if(action.type === 'REMOVE') {
            const existingItemIndex = state.items.findIndex(item => item.id === action.id)
            const existingItem = state.items[existingItemIndex]
            const updatedTotalAmount = state.totalAmount - existingItem.price;
            let updatedItems;
            if (existingItem.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.id)
            } else {
                let updatedItem = {...existingItem, amount: existingItem.amount - 1}
                updatedItems = [...state.items]
                updatedItems[existingItemIndex] = updatedItem
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }
    return defaultCartState;
}
const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(contextReducer, defaultCartState);

    const addItemHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item})
    }

    const removeItemHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id})
    }


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }
    return (<CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>)
}

export default CartProvider;