import {uiActions} from "./ui";
import {cartActions} from "./cart";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-app-2-5f344-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
            if (!response.ok) {
                throw new Error('Cart data can not be fetched!')
            }
            const data = await response.json()
            return data;
        };

        try {
            const dataCart = await fetchData()
            dispatch(cartActions.replaceCart({
                items: dataCart.items || [],
                totalQuantity: dataCart.totalQuantity
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: "Error",
                message: "Error fetching data!"
            }))
        }
    }
}
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data',
            })
        )

        const sendRequest = async () => {
            const response = await fetch('https://react-app-2-5f344-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                {
                    method: "PUT",
                    body: JSON.stringify(cart)
                })
            console.log(cart)
            if (!response.ok) {
                throw new Error('Cart data can not be saved!')
            }
        }

        try {
            await sendRequest()
            dispatch(uiActions.showNotification({
                status: 'sent',
                title: "Success",
                message: 'Successfully sent!'
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: "Error",
                message: "Error occurred!"
            }))
        }
    }
}