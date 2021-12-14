import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"
import CartProvider from "../../store/CartProvider";
import {useContext, useEffect, useState} from "react";
import cartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const ctx = useContext(cartContext)
    const {items} = ctx;
    const [btnHighlighted, setBtnHighlighted] = useState(false)
    const itemsAmount = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0);

    const btnStyles = `${classes.button} ${btnHighlighted ? classes.bump : ''}`

    useEffect(() => {
        if(items.length === 0) {
            return
        }
        setBtnHighlighted(true)
        const timer = setTimeout(() => {
            setBtnHighlighted(false)
        }, 300)
        return () => {
            clearTimeout(timer)
        }
    }, [items])
    return (
            <button className={btnStyles} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
                <span>Your Cart</span>
                <span className={classes.badge}>{itemsAmount}</span>
            </button>

    )

}

export default HeaderCartButton