import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import {useContext} from "react";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";
const Cart = (props) => {
    const cartCtx = useContext(cartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItem = cartCtx.items.length > 0

    const addItemHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    }

    const removeItemHandler = (id) => {
        cartCtx.removeItem(id)
    }
    let cartItems = <ul className={classes['cart-item']}>
        {cartCtx.items.map((item) => (
           <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={removeItemHandler.bind(null, item.id)} onAdd={addItemHandler.bind(null, item)}/>
        ))}
    </ul>
    return (
        <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span> Total amount </span>
            <span> {totalAmount} </span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItem && <button className={classes.button}>Order</button>}
        </div>
        </Modal>
    )
}

export default Cart;